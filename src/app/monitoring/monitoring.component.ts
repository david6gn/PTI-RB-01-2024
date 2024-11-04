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
        let data = Number(message.data.toFixed(2))
        switch (message.sensorType) {
          case 'temperature':
            this.monitoringList[0].sensorValue = `${data} °C`
            this.chartService.addData(`chart-${this.monitoringList[0].chartId}`, data)
            break;
          case 'pH':
            this.monitoringList[1].sensorValue = `${data}`
            this.chartService.addData(`chart-${this.monitoringList[1].chartId}`, data)
            break;
          case 'turbidity':
            this.monitoringList[2].sensorValue = `${data} PPT`
            this.chartService.addData(`chart-${this.monitoringList[2].chartId}`, data)
            break;
          default:
            this.monitoringList[3].sensorValue = `${data} NTU`
            this.chartService.addData(`chart-${this.monitoringList[3].chartId}`, data)
            break;
        }
    });
    this.socketSerivce.subscribe()
  }
  
  ngOnDestroy(): void {
    this.socketSerivce.unsubscribe()
  }
}
