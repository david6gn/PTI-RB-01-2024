import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Sensoritem } from '../../models/sensoritem';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizeFirstCharPipe } from '../../pipe/capitalize-first-char.pipe';
import { CapitalizeLastCharPipe } from '../../pipe/capitalize-last-char.pipe';

@Component({
  selector: 'app-sensor-data',
  standalone: true,
  imports: [ChartModule, FormsModule, CapitalizeFirstCharPipe, CapitalizeLastCharPipe],
  templateUrl: './sensor-data.component.html',
  styleUrl: './sensor-data.component.css'
})
export class SensorDataComponent implements OnInit {
  type: string = '';
  sensorName: string = '';
  sensorValue: string = '';
  sensorStatus: boolean = false;
  sensorHighestValue: string = '';
  sensorLowestValue: string = '';
  lineChart: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.type = params['type']; 
      switch (this.type) {
        case 'suhu':
          this.navigateToTemperatureSensor();
          break;
          
        case 'ph':
          this.navigateTopHSensor();
          break;
      
        case 'salinitas':
          this.navigateToSalinitySensor();
          break;
      
        case 'kekeruhan':
          this.navigateToTurbiditySensor();
          break;
      
        default:
          this.navigateToTemperatureSensor();
          break;
      }
      this.generateChart(this.type)
      for (let i = 0; i < 7; i++) {
        this.add();
      }
    });

  }

  navigateToSensorData(): void {
    this.router.navigate([`data`, this.type], { relativeTo: this.route.parent, replaceUrl: true });
  }
  

  navigateToTemperatureSensor() {
    this.type = "suhu"
    this.navigateToSensorData()
    this.updateSensorData("Sensor Suhu", true, "24°C", "27°C", "21°C");
  }

  navigateTopHSensor() {
    this.type = "ph"
    this.navigateToSensorData()
    this.updateSensorData("Sensor pH", true, "6.5", "7.4", "6.1");
  }

  navigateToSalinitySensor() {
    this.type = "salinitas"
    this.navigateToSensorData()
    this.updateSensorData('Sensor Salinitas', false, "35 PPT", "42 PPT", "31 PPT")
  }

  navigateToTurbiditySensor() {
    this.type = "kekeruhan"
    this.navigateToSensorData()
    this.updateSensorData('Sensor Kekeruhan', false, "1,42 NTU", "1,76 NTU", "1,23 NTU")
  }

  onSwitchChange() {
    this.sensorStatus = !this.sensorStatus;
  }

  generateChart(name: string) {
    let color: string;
    let line: string;

    switch (name) {
      case "suhu":
        color = "#FF5A5A";
        line = "#9D0000";
        break;
      case "ph":
        color = "#FF5AE5";
        line = "#9D007A";
        break;
      case "salinitas":
        color = "#D45AFF";
        line = "#58009D";
        break;
      default:
        color = "#FFB35A";
        line = "#9D5500";
    }

    this.lineChart = new Chart({
      chart: {
        type: 'line',
        height: 220,
        width: 500,
        borderRadius: 8,
        marginTop: 20,
        shadow: {
          color: 'rgba(0, 0, 0, 0.5)', 
          offsetX: 2,                 
          offsetY: 2,                 
          opacity: 0.1,                
          width: 3                   
        },
      },
      title: {
        text: undefined
      },
      xAxis: {
        categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'],
        title: {
          text: undefined,
        },
        margin: 0,
        labels: {
          y: 12,
          style: {
            color: '#666666',
            fontSize: '10px', 
          }
        }
      },
      yAxis: {
        title: {
          text: undefined, 
        },
        tickInterval: 2,
        labels: {
          style: {
            color: '#666666', 
            fontSize: '10px', 
          }
        }
      },
      series: [
        {
          type: 'line',
          data: [],
          color: line,
          showInLegend: false,
          marker: {
            enabled: true,
            fillColor: color,
            lineWidth: 2,
            lineColor: color
          } 
        }
      ],
      credits: {
        enabled: false
      }
    });
  }

  updateSensorData(name: string, status: boolean, value: string, highestValue: string, lowestValue: string) {
    this.sensorName = name
    this.sensorStatus = status
    this.sensorValue = value
    this.sensorHighestValue = highestValue
    this.sensorLowestValue = lowestValue
  }


  add() {
    this.lineChart.addPoint(Math.floor(Math.random() * 10));
  }

  navigateToSensorInfo() {
    this.router.navigate(['info', this.type], { relativeTo: this.route.parent, replaceUrl: true });
  }
}
