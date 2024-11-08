import { AfterViewInit, Component, Input } from '@angular/core';
import { Monitoringitem } from '../../models/monitoringitem';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../../service/socket.service';
import * as Highcharts from 'highcharts';
import { ChartService } from '../../service/chart.service';
import { ApiService } from '../../service/api.service';
import { SensorResponse } from '../../models/sensor-response';
import { PostResponse } from '../../models/post-response';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-monitoring-item',
  standalone: true,
  imports: [ChartModule, FormsModule],
  templateUrl: './monitoring-item.component.html',
  styleUrl: './monitoring-item.component.css',
  providers: [SocketService]
})
export class MonitoringItemComponent implements AfterViewInit{

  constructor(
    private router: Router, 
    private route: ActivatedRoute,  
    private chartService: ChartService, 
    private apiService: ApiService,
    private snackBar: SnackbarService
  ) {}

  @Input() monitoringItem!:Monitoringitem;
  
  lineChart: Highcharts.Chart | undefined;
  sensorValue: number = 0;
  sensorStatus: boolean = true;

  ngAfterViewInit(): void {
    this.lineChart = this.chartService.generateChart(`chart-${this.monitoringItem.chartId}`, this.monitoringItem.sensorName);
    this.getSensorData();
  }

  onSwitchChange() {
    if (this.sensorStatus) {
      this.stopSensor()
    } else {
      this.startSensor()
    }
  }

  getSensorData() {
    this.apiService.getSensorData(this.monitoringItem.sensorId).subscribe({
      next: (response: SensorResponse) => {
        this.sensorStatus = response.data.status;
      }, 
      error: (error) => {
        console.log(error);
    }});
  }

  startSensor() {
    this.apiService.startSensor(this.monitoringItem.sensorId).subscribe({
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
    this.apiService.stopSensor(this.monitoringItem.sensorId).subscribe({
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
