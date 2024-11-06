import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { MonitoringItemComponent } from '../monitoring-item/monitoring-item.component';
import { Monitoringitem } from '../../models/monitoringitem';
import { SocketService } from '../../service/socket.service';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, HomeComponent, MonitoringItemComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent implements OnInit, OnDestroy {
  
  constructor(private socketSerivce: SocketService, private chartService: ChartService){}

  monitoringList: Monitoringitem[] = [
    { sensorName: 'Sensor Suhu', sensorStatus: true, sensorValue: "- °C", sensorHistory: 0, chartId: 1 },
    { sensorName: 'Sensor pH', sensorStatus: true, sensorValue: "- ", sensorHistory: 0, chartId: 2 },
    { sensorName: 'Sensor Salinitas', sensorStatus: false, sensorValue: "- PPT", sensorHistory: 0, chartId: 3},
    { sensorName: 'Sensor Kekeruhan', sensorStatus: true, sensorValue: "- NTU", sensorHistory: 0, chartId: 4 }
  ];

  ngOnInit(): void {
    this.socketSerivce.onMessage().subscribe((message: any) => {
      let dataArray: number[] = [];
      let data: number = 0;
      let isArray: boolean;
      isArray = message.hasOwnProperty('arrayData');
      if (isArray) {
        const stringArray = message.arrayData.split(',');
        dataArray = stringArray.map(Number);
        dataArray = dataArray.slice(10);
      } else {
        data = Number(message.data)
      }
      switch (message.sensorType) {
        case 'temperature':
          if (isArray) {
            this.monitoringList[0].sensorValue = `${dataArray[9]} °C`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-${this.monitoringList[0].chartId}`, value)
            })
          } else {
            this.monitoringList[0].sensorValue = `${data} °C`
            this.chartService.addData(`chart-${this.monitoringList[0].chartId}`, data)
          }
          break;
        case 'pH':
          if (isArray) {
            this.monitoringList[1].sensorValue = `${dataArray[9]}`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-${this.monitoringList[1].chartId}`, value)
            })
          } else {
            this.monitoringList[1].sensorValue = `${data}`
            this.chartService.addData(`chart-${this.monitoringList[1].chartId}`, data)
          }
          break;
        case 'salinity':
          if (isArray) {
            this.monitoringList[2].sensorValue = `${dataArray[9]} PPT`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-${this.monitoringList[2].chartId}`, value)
            })
          } else {
            this.monitoringList[2].sensorValue = `${data} PPT`
            this.chartService.addData(`chart-${this.monitoringList[2].chartId}`, data)
          }
          break;
        case 'turbidity':
          if (isArray) {
            this.monitoringList[3].sensorValue = `${dataArray[9]} NTU`
            dataArray.forEach((value) => {
              this.chartService.addData(`chart-${this.monitoringList[3].chartId}`, value)
            })
          } else {
            this.monitoringList[3].sensorValue = `${data} NTU`
            this.chartService.addData(`chart-${this.monitoringList[3].chartId}`, data)
          }
          break;
        default:
          break;
      }
    });
    this.socketSerivce.subscribe()
  }
  
  ngOnDestroy(): void {
    this.socketSerivce.unsubscribe()
  }
}
