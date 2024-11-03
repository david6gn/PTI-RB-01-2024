import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostResponse } from '../../models/post-response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  time: string = '';
  date: string = '';
  private intervalId: any;
  ngOnInit(): void {
    this.updateLocalDateTime()
    this.navigateToMonitoring()
    this.intervalId = setInterval(() => this.updateLocalDateTime(), 1000); 
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private snackBar: MatSnackBar) {}
  username: string = "Rizki Esa Fadillah";
  imageuser: string = "/temp_item/bg_user.jpg";

  navigateToMonitoring() {
    this.router.navigate(['monitoring'], {relativeTo: this.route});
  }

  navigateToSensor() {
    this.router.navigate(['sensor', 'suhu'], {relativeTo: this.route});
  }

  navigateToTools() {
    this.router.navigate(['tools'], {relativeTo: this.route});
  }

  navigateToHistory() {
    this.router.navigate(['history'], {relativeTo: this.route});
  }

  navigateToNotification() {
    this.router.navigate(['notification'], {relativeTo: this.route});
  }

  updateLocalDateTime() {
    const now = new Date();
    this.date = this.formatDate(now);
    this.time = now.toLocaleTimeString();
  }
  
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
  
    return date.toLocaleDateString('id-ID', options);
  }

  logoutUser() {
    this.apiService.logout().subscribe({
      next: (response: PostResponse) => {
        localStorage.clear()
        this.snackBar.open(response.message, undefined, { duration: 2000 });
        this.router.navigate(['/']);;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
