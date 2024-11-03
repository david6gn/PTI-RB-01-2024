import { Component, DoCheck, Input } from '@angular/core';
import { Sensoritem } from '../../models/sensoritem';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sensor-item',
  standalone: true,
  imports: [ChartModule, FormsModule],
  templateUrl: './sensor-item.component.html',
  styleUrl: './sensor-item.component.css'
})
export class SensorItemComponent implements DoCheck {
  @Input() sensorItem!:Sensoritem;

  type: string = '';
  sensorName: string = '';
  sensorValue: string = '';
  sensorStatus: boolean = false;
  sensorHighestValue: string = '';
  sensorLowestValue: string = '';
  lineChart: any;

  ngDoCheck(): void {
    if (this.sensorItem && this.sensorItem.sensorName !== this.sensorName) {
       this.sensorName = this.sensorItem.sensorName;
       this.bindData();
       this.generateChart(this.sensorName);
       for (let i = 0; i < 7; i++) {
        this.add()
      }
    }
 }

  bindData() {
    this.type = this.sensorItem.sensorName.replace(/^Sensor\s+/i, '').trim();
    this.sensorName = this.sensorItem.sensorName
    this.sensorValue = this.sensorItem.sensorValue
    this.sensorStatus = this.sensorItem.sensorStatus
    this.sensorHighestValue = this.sensorItem.sensorHighestValue
    this.sensorLowestValue = this.sensorItem.sensorLowestValue
  }

  onSwitchChange() {
    this.sensorItem.sensorStatus = !this.sensorItem.sensorStatus;
  }

  generateChart(name: string) {
    let color: string;
    let line: string;

    switch (name) {
      case "Sensor Suhu":
        color = "#FF5A5A";
        line = "#9D0000";
        break;
      case "Sensor pH":
        color = "#FF5AE5";
        line = "#9D007A";
        break;
      case "Sensor Salinitas":
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


  add() {
    this.lineChart.addPoint(Math.floor(Math.random() * 10));
  }
}
