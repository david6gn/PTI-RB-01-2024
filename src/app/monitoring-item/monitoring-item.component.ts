import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Monitoringitem } from '../../models/monitoringitem';
import { Chart } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../../service/socket.service';
import * as Highcharts from 'highcharts';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-monitoring-item',
  standalone: true,
  imports: [ChartModule, FormsModule],
  templateUrl: './monitoring-item.component.html',
  styleUrl: './monitoring-item.component.css',
  providers: [SocketService]
})
export class MonitoringItemComponent implements AfterViewInit{

  constructor(private router: Router, 
    private route: ActivatedRoute,  
    private chartService: ChartService, ) {}

  @Input() monitoringItem!:Monitoringitem;
  
  isChecked: boolean = false;
  lineChart: Highcharts.Chart | undefined;
  sensorValue: number = 0;

  ngAfterViewInit(): void {
    this.lineChart = this.chartService.generateChart(`chart-${this.monitoringItem.chartId}`, this.monitoringItem.sensorName)
  }

  onSwitchChange() {
    this.monitoringItem.sensorStatus = !this.monitoringItem.sensorStatus;
  }


  navigateToDetailSensor() {
    let type: string = '';
  
    switch (this.monitoringItem.sensorName) {
      case "Sensor Suhu":
        type = "suhu";
        break;
      case "Sensor pH":
        type = "ph";
        break;
      case "Sensor Salinitas":
        type = "salinitas";
        break;
        case "Sensor Kekeruhan":
          type = "kekeruhan";
          break;
      default:
        return;
    }

    this.router.navigate([`sensor/data`, type],  { relativeTo: this.route.parent });
  }

}
