import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorItemComponent } from '../sensor-item/sensor-item.component';
import { Sensoritem } from '../../models/sensoritem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, SensorItemComponent],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.css'
})
export class SensorComponent implements OnInit, OnChanges {
  @Input('type') type ?:string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  sensorData: Sensoritem = {sensorName: "Sensor Suhu", sensorStatus: false, sensorValue: "24°C", sensorHighestValue: "27°C", sensorLowestValue: "21°C"};

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['type']) {
    //   const currentValue = changes['type'].currentValue;
    //   if (currentValue) {
    //     switch (this.type) {
    //       case "suhu":
    //         this.updateSensorData("Sensor Suhu", true, "24°C", "27°C", "21°C");
    //         break;
    //       case "ph":
    //         this.updateSensorData("Sensor pH", true, "6.5", "7.4", "6.1");
    //         break;
    //       case "salinitas":
    //         this.updateSensorData('Sensor Salinitas', false, "35 PPT", "42 PPT", "31 PPT")
    //         break;
    //       case "kekeruhan":
    //         this.updateSensorData('Sensor Kekeruhan', false, "1,42 NTU", "1,76 NTU", "1,23 NTU")
    //         break;
    //       default:
    //         console.warn("Unknown sensor type");
    //     }
    //   } else {
    //   }
    // }
  }
  ngOnInit(): void {
    console.log(this.type)
  }


  navigateToSensor(): void {
    this.router.navigate([`sensor`, this.type], { relativeTo: this.route.parent });
  }
  

  navigateToTemperatureSensor() {
    this.type = "suhu"
    this.navigateToSensor()
    this.updateSensorData("Sensor Suhu", true, "24°C", "27°C", "21°C");
  }

  navigateTopHSensor() {
    this.type = "ph"
    this.navigateToSensor()
    this.updateSensorData("Sensor pH", true, "6.5", "7.4", "6.1");
  }

  navigateToSalinitySensor() {
    this.type = "salinitas"
    this.navigateToSensor()
    this.updateSensorData('Sensor Salinitas', false, "35 PPT", "42 PPT", "31 PPT")
  }

  navigateToTurbiditySensor() {
    this.type = "kekeruhan"
    this.navigateToSensor()
    this.updateSensorData('Sensor Kekeruhan', false, "1,42 NTU", "1,76 NTU", "1,23 NTU")
  }

  updateSensorData(name: string, status: boolean, value: string, highestValue: string, lowestValue: string) {
    this.sensorData.sensorName = name
    this.sensorData.sensorStatus = status
    this.sensorData.sensorValue = value
    this.sensorData.sensorHighestValue = highestValue
    this.sensorData.sensorLowestValue = lowestValue
  }
}

