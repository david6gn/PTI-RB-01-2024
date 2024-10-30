import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.navigateToMonitoring()
  }
  constructor(private router: Router, private route: ActivatedRoute) {}
  time: string = "10:00 AM"
  date: string = "Kamis, 10 Okbotber 2024"
  username: string = "Rizki Esa Fadillah"
  imageuser: string = "/temp_item/bg_user.jpg"

  navigateToMonitoring() {
    this.router.navigate(['monitoring'], {relativeTo: this.route})
  }

  navigateToSensor() {
    this.router.navigate(['sensor'], {relativeTo: this.route})
  }
}
