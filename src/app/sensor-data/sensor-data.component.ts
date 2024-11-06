import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizeFirstCharPipe } from '../../pipe/capitalize-first-char.pipe';
import { CapitalizeLastCharPipe } from '../../pipe/capitalize-last-char.pipe';
import { ChartService } from '../../service/chart.service';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-sensor-data',
  standalone: true,
  imports: [ChartModule, FormsModule, CapitalizeFirstCharPipe, CapitalizeLastCharPipe],
  templateUrl: './sensor-data.component.html',
  styleUrl: './sensor-data.component.css'
})
export class SensorDataComponent implements OnInit, OnDestroy {
  type: string = '';
  chartId: number = 0;
  sensorName: string = '';
  sensorValue: string = '';
  sensorStatus: boolean = false;
  sensorHighestValue: string = '';
  sensorLowestValue: string = '';
  lineChart: Highcharts.Chart | undefined;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private chartService: ChartService, 
    private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onMessage().subscribe((message: any) => {
      let dataArray: number[] = [];
      let data: number = 0;
      let isArray: boolean;
      isArray = message.hasOwnProperty('arrayData') 
      if (isArray) {
        const stringArray = message.arrayData.split(',');
        dataArray = stringArray.map(Number);
      } else {
        data = Number(message.data)
      }
      if (this.lineChart === undefined) {
        this.lineChart = this.chartService.generateChart(`chart-detail-${this.chartId}`, this.sensorName, true)
      }
      switch (message.sensorType) {
        case 'temperature':
          if (isArray) {
            this.sensorValue = `${dataArray[9]} °C`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-detail-${this.chartId}`, value)
            })
          } else {
            this.sensorValue = `${data} °C`
            this.chartService.addData(`chart-detail-${this.chartId}`, data)
          }
          break;
        case 'pH':
          if (isArray) {
            this.sensorValue = `${dataArray[9]}`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-detail-${this.chartId}`, value)
            })
          } else {
            this.sensorValue = `${data}`
            this.chartService.addData(`chart-detail-${this.chartId}`, data)
          }
          break;
        case 'salinity':
          if (isArray) {
            this.sensorValue = `${dataArray[9]} PPT`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-detail-${this.chartId}`, value)
            })
          } else {
            this.sensorValue = `${data} PPT`
            this.chartService.addData(`chart-detail-${this.chartId}`, data)
          }
          break;
        case 'turbidity':
          if (isArray) {
            this.sensorValue = `${dataArray[9]} NTU`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-detail-${this.chartId}`, value)
            })
          } else {
            this.sensorValue = `${data} NTU`
            this.chartService.addData(`chart-detail-${this.chartId}`, data)
          }
          break;
        default:
          break;
      }
    });

    this.route.params.subscribe(params => {
      this.type = params['type']; 
      this.socketService.unsubscribe()
      switch (this.type) {
        case 'suhu':
          this.chartId = 1;
          this.lineChart = undefined
          this.navigateToTemperatureSensor();
          break;
          
        case 'ph':
          this.chartId = 2;
          this.lineChart = undefined
          this.navigateTopHSensor();
          break;
      
        case 'salinitas':
          this.chartId = 3;
          this.lineChart = undefined
          this.navigateToSalinitySensor();
          break;
      
        case 'kekeruhan':
          this.chartId = 4;
          this.lineChart = undefined
          this.navigateToTurbiditySensor();
          break;
      
        default:
          this.chartId = 1;
          this.lineChart = undefined
          this.navigateToTemperatureSensor();
          break;
      }
    });
  }

  navigateToSensorData(): void {
    this.router.navigate([`data`, this.type], { relativeTo: this.route.parent, replaceUrl: true });
  }
  

  navigateToTemperatureSensor() {
    this.type = "suhu"
    this.navigateToSensorData()
    this.socketService.subscribeTemperature()
    this.updateSensorData("Sensor Suhu", true, "- °C", "- °C", "- °C");
  }

  navigateTopHSensor() {
    this.type = "ph"
    this.navigateToSensorData()
    this.socketService.subscribePH()
    this.updateSensorData("Sensor pH", true, "-", "-", "-");
  }

  navigateToSalinitySensor() {
    this.type = "salinitas"
    this.navigateToSensorData()
    this.socketService.subscribeSalinity()
    this.updateSensorData('Sensor Salinitas', false, "- PPT", "- PPT", "- PPT")
  }

  navigateToTurbiditySensor() {
    this.type = "kekeruhan"
    this.navigateToSensorData()
    this.socketService.subscribeTurbidity()
    this.updateSensorData('Sensor Kekeruhan', false, "- NTU", "- NTU", "- NTU")
  }

  onSwitchChange() {
    this.sensorStatus = !this.sensorStatus;
  }

  updateSensorData(name: string, status: boolean, value: string, highestValue: string, lowestValue: string) {
    this.sensorName = name;
    this.sensorStatus = status;
    this.sensorValue = value;
    this.sensorHighestValue = highestValue;
    this.sensorLowestValue = lowestValue;
  }

  navigateToSensorInfo() {
    this.router.navigate(['info', this.type], { relativeTo: this.route.parent, replaceUrl: true });
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribe();
  }
}
