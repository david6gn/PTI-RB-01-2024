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
      const time = this.convertUTCtoWIB(log.time)
      this.temperatureSensor.push({
        time: time,
        value: log.temperature,
        status: log.temperature_status,
        info: log.temperature_info
      });

      this.phSensor.push({
        time: time,
        value: log.ph,
        status: log.ph_status,
        info: log.ph_info
      });

      this.salinitySensor.push({
        time: time,
        value: log.salinity,
        status: log.salinity_status,
        info: log.salinity_info
      });

      this.turbiditySensor.push({
        time: time,
        value: log.turbidity,
        status: log.turbidity_status,
        info: log.turbidity_info
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


  convertUTCtoWIB(utcTime: string) {
    const [hours, minutes] = utcTime.split(':').map(Number);
  
    let wibHours = hours + 7;
    if (wibHours >= 24) {
      wibHours -= 24;
    }
  
    const formattedHours = wibHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }
}
