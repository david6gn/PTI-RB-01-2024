import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.css'
})
export class SensorComponent {
  status: string = "Suhu"

  navigate1() {
    this.status = "Suhu"
  }

  navigate2() {
    this.status = "pH"
  }

  navigate3() {
    this.status = "Salinitas"
  }

  navigate4() {
    this.status = "Kekeruhan"
  }
}
