import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Monitoringitem } from '../monitoringitem';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monitoring-item',
  standalone: true,
  imports: [ChartModule, FormsModule],
  templateUrl: './monitoring-item.component.html',
  styleUrl: './monitoring-item.component.css'
})
export class MonitoringItemComponent implements OnChanges{
  @Input() monitoringItem!:Monitoringitem;
  
  isChecked: boolean = false;
  lineChart: any

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monitoringItem']) {
      const currentValue = changes['monitoringItem'].currentValue;
      if (currentValue) {
        this.isChecked = this.monitoringItem.sensorStatus;
        this.generateChart(this.monitoringItem.sensorName)
        for (let i = 0; i < 7; i++) {
          this.add()
        }
        
      } else {
      }
    }
  }

  onSwitchChange() {
    this.monitoringItem.sensorStatus = !this.monitoringItem.sensorStatus;
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
        height: 150,
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
