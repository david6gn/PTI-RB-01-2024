import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { MonitoringItemComponent } from '../monitoring-item/monitoring-item.component';
import { Monitoringitem } from '../../models/monitoringitem';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, HomeComponent, MonitoringItemComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent {
  monitoringList: Monitoringitem[] = [
    { sensorName: 'Sensor Suhu', sensorStatus: true, sensorValue: "24°C", sensorHistory: [] },
    { sensorName: 'Sensor pH', sensorStatus: true, sensorValue: "6,5", sensorHistory: [] },
    { sensorName: 'Sensor Salinitas', sensorStatus: false, sensorValue: "35 PPT", sensorHistory: [] },
    { sensorName: 'Sensor Kekeruhan', sensorStatus: true, sensorValue: "1,42 NTU", sensorHistory: [] }
  
  ];
}
