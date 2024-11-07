import { Component, OnInit } from '@angular/core';
import { HistoryItem, LogItem } from '../../models/history-response';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule],
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.css'
})
export class HistoryDetailComponent implements OnInit{
  history: HistoryItem;
  page: number = 1;
  limit: number = 6;
  temperatureSensor: any[] = [];
  phSensor: any[] = [];
  salinitySensor: any[] = [];
  turbiditySensor: any[] = [];
  type: string = 'suhu';
  activatedFilter: any[] = [];

  constructor(router: Router) {
    this.history = router.getCurrentNavigation()?.extras.state!['history'];
  }

  ngOnInit(): void {
    this.splitLogData(this.history.log)
    this.activatedFilter = this.temperatureSensor;
  }

  splitLogData(logs: LogItem[]): void {
    this.temperatureSensor = [];
    this.phSensor = [];
    this.salinitySensor = [];
    this.turbiditySensor = [];

    logs.forEach(log => {
      this.temperatureSensor.push({
        time: log.time,
        value: log.temperature,
        status: log.temperature_status
      });

      this.phSensor.push({
        time: log.time,
        value: log.ph,
        status: log.ph_status
      });

      this.salinitySensor.push({
        time: log.time,
        value: log.salinity,
        status: log.salinity_status
      });

      this.turbiditySensor.push({
        time: log.time,
        value: log.turbidity,
        status: log.turbidity_status
      });
    });
  }

  updateType(num: number) {
    const types = ['suhu', 'ph', 'salinitas', 'kekeruhan'];
    this.type = types[num - 1] || 'suhu';
    this.page = 1;

    switch (this.type) {
      case 'suhu':
        this.activatedFilter = this.temperatureSensor;
        break;
      case 'ph':
        this.activatedFilter = this.phSensor;
        break;
      case 'salinitas':
        this.activatedFilter = this.salinitySensor;
        break;
      case 'kekeruhan':
        this.activatedFilter = this.turbiditySensor;
        break;
      default:
        this.activatedFilter = this.temperatureSensor;
        break;
    }
  }
}
