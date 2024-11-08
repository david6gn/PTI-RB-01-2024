import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizeFirstCharPipe } from '../../pipe/capitalize-first-char.pipe';
import { CapitalizeLastCharPipe } from '../../pipe/capitalize-last-char.pipe';
import { ChartService } from '../../service/chart.service';
import { SocketService } from '../../service/socket.service';
import { ApiService } from '../../service/api.service';
import { SensorResponse } from '../../models/sensor-response';
import { PostResponse } from '../../models/post-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../service/snackbar.service';

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
  sensorId: string = '';
  sensorName: string = '';
  sensorValue: string = '';
  sensorStatus: boolean = false;
  sensorMaxSetting: number = 0;
  sensorMinSetting: number = 0;
  sensorMaxEditable: number = 0;
  sensorMinEditable: number = 0;
  lineChart: Highcharts.Chart | undefined;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private chartService: ChartService, 
    private socketService: SocketService,
    private apiService: ApiService,
    private snackBar: SnackbarService
  ) {}

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
          this.lineChart = undefined;
          this.navigateToTemperatureSensor();
          break;
          
        case 'ph':
          this.chartId = 2;
          this.lineChart = undefined;
          this.navigateTopHSensor();
          break;
      
        case 'salinitas':
          this.chartId = 3;
          this.lineChart = undefined;
          this.navigateToSalinitySensor();
          break;
      
        case 'kekeruhan':
          this.chartId = 4;
          this.lineChart = undefined;
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
    this.type = "suhu";
    this.sensorId = 'temperature';
    this.sensorName = 'Sensor Suhu';
    this.navigateToSensorData();
    this.getSensorData();
    this.socketService.subscribeTemperature();
  }

  navigateTopHSensor() {
    this.type = "ph";
    this.sensorId = 'ph';
    this.sensorName = 'Sensor pH';
    this.navigateToSensorData();
    this.getSensorData();
    this.socketService.subscribePH();
  }

  navigateToSalinitySensor() {
    this.type = "salinitas";
    this.sensorId = 'salinity';
    this.sensorName = 'Sensor Salinitas';
    this.navigateToSensorData();
    this.getSensorData();
    this.socketService.subscribeSalinity();
  }

  navigateToTurbiditySensor() {
    this.type = "kekeruhan";
    this.sensorId = 'turbidity';
    this.sensorName = 'Sensor Kekeruhan';
    this.navigateToSensorData();
    this.getSensorData();
    this.socketService.subscribeTurbidity();
  }

  onSwitchChange() {
    if (this.sensorStatus) {
      this.stopSensor()
    } else {
      this.startSensor()
    }
  }

  getSensorData() {
    this.apiService.getSensorData(this.sensorId).subscribe({
      next: (response: SensorResponse) => {
        this.sensorStatus = response.data.status;
        this.sensorMinSetting = response.data.min;
        this.sensorMaxSetting = response.data.max;
        this.sensorMinEditable = response.data.min;
        this.sensorMaxEditable = response.data.max;
      }, 
      error: (error) => {
        console.log(error);
    }});
  }

  startSensor() {
    this.apiService.startSensor(this.sensorId).subscribe({
      next: (response: PostResponse) => {
        if(!response.error) {
          this.getSensorData();
        }
      },
      error: (error) => {
        if(error.status === 403) {
          this.snackBar.showSnackBar("Hanya admin yang dapat menghidupkan sensor!");
        } else {
          this.snackBar.showSnackBar(error.error.message);
        }
      }
    })
  }

  stopSensor() {
    this.apiService.stopSensor(this.sensorId).subscribe({
      next: (response: PostResponse) => {
        if(!response.error) {
          this.getSensorData()
        }
      },
      error: (error) => {
        if(error.status === 403) {
          this.snackBar.showSnackBar("Hanya admin yang dapat mematikan sensor!");
        } else {
          this.snackBar.showSnackBar(error.error.message);
        }
      }
    })
  }

  updateSensorSetting(): void {
    if (this.sensorMaxEditable <= this.sensorMinEditable) {
      this.snackBar.showSnackBar("Nilai maksmimal tidak boleh lebih rendah dari nilai minimal!");
      return
    }
    if (this.sensorMinEditable >= this.sensorMaxEditable) {
      this.snackBar.showSnackBar("Nilai minimal tidak boleh lebih tinggi dari nilai maksimal!");
      return
    }
    const data = {
      min: this.sensorMinEditable,
      max: this.sensorMaxEditable
    };
    this.apiService.updateSensorSetting(data, this.sensorId).subscribe({
      next: (response: PostResponse) => {
        if(!response.error) {
          this.snackBar.showSnackBar(response.message);
          this.getSensorData();
        } else {
          console.log(response.message)
        }
      },
      error: (error) => {
        if(error.status === 403) {
          this.snackBar.showSnackBar("Hanya admin yang dapat mengubah interval sensor!");
        } else {
          this.snackBar.showSnackBar(error.error.message);
        }
      }
    });
  }

  increaseMinSetting() {
    this.sensorMinEditable = this.sensorMinEditable + 1;
  }

  decreaseMinSetting() {
    this.sensorMinEditable = this.sensorMinEditable - 1;
  }

  increaseMaxSetting() {
    this.sensorMaxEditable = this.sensorMaxEditable + 1;
  }

  decreaseMaxSetting() {
    this.sensorMaxEditable = this.sensorMaxEditable - 1;
  }

  

  navigateToSensorInfo() {
    this.router.navigate(['info', this.type], { relativeTo: this.route.parent, replaceUrl: true });
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribe();
  }
}
