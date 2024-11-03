import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { MonitoringItemComponent } from '../monitoring-item/monitoring-item.component';
import { Monitoringitem } from '../../models/monitoringitem';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, HomeComponent, MonitoringItemComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent implements OnInit, OnDestroy {
  
  constructor(private socketService: SocketService){}

  monitoringList: Monitoringitem[] = [
    { sensorName: 'Sensor Suhu', sensorStatus: true, sensorValue: "..°C", sensorHistory: [] },
    { sensorName: 'Sensor pH', sensorStatus: true, sensorValue: "...", sensorHistory: [] },
    { sensorName: 'Sensor Salinitas', sensorStatus: false, sensorValue: ".. PPT", sensorHistory: [] },
    { sensorName: 'Sensor Kekeruhan', sensorStatus: true, sensorValue: ".. NTU", sensorHistory: [] }
  ];


  ngOnInit(): void {
    this.socketService.onMessage().subscribe((message: any) => {
      let data = message.data.toFixed(2)
      switch (message.sensorType) {
        case 'temperature':
          this.monitoringList[0].sensorValue = `${data}°C`;
          break;
        case 'pH':
          this.monitoringList[1].sensorValue = `${data}`;
          break;
        case 'turbidity':
          this.monitoringList[2].sensorValue = `${data} PPT`
          break;
        case 'salinity':
          this.monitoringList[3].sensorValue = `${data} NTU`;
          break;
        default:
          console.error('Unknown sensor type:', message.sensorType);
      }
    });
    this.socketService.subscribe()
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribe()
  }
}
