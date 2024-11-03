import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorDataComponent } from '../sensor-data/sensor-data.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { CapitalizeFirstCharPipe } from '../../pipe/capitalize-first-char.pipe';
import { CapitalizeLastCharPipe } from '../../pipe/capitalize-last-char.pipe';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, SensorDataComponent, RouterOutlet, CapitalizeFirstCharPipe, CapitalizeLastCharPipe],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.css'
})
export class SensorComponent implements OnInit {

  type: string = '';
  typeString: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService) {
    const urlTree = this.router.parseUrl(this.router.url);
    const primaryChild = urlTree.root.children['primary'];
    if (primaryChild && primaryChild.segments.length > 3) {
      this.type = primaryChild.segments[3].path;
    } else {
      this.type = 'suhu';
    }
  }


  ngOnInit(): void {
    this.navigateToSensorData()
  }

  navigateToSensorData(): void {
    this.router.navigate([`data`, this.type], { relativeTo: this.route, replaceUrl: true });
  }
  navigateToSensorInfo(): void {
    this.router.navigate([`info`, this.type], { relativeTo: this.route, replaceUrl: true});
  }

  updateType(num: number): void {
    switch (num) {
      case 1:
        this.type = 'suhu'
        break;
      case 2:
        this.type = 'ph'
        break;
      case 3:
        this.type = 'salinitas'
        break;
      case 4:
        this.type = 'kekeruhan'
        break;
      default:
        break;
    }
    const urlTree = this.router.parseUrl(this.router.url);
    const primaryChild = urlTree.root.children['primary'];
    if (primaryChild && primaryChild.segments.length > 3) {
      if (primaryChild.segments[2].path === 'data') {
        this.navigateToSensorData()
      } else {
          this.navigateToSensorInfo()
      }
    }
  }
}

