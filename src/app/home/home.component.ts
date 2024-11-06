import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostResponse } from '../../models/post-response';
import { AuthService } from '../../service/auth.service';
import { Messaging, deleteToken } from '@angular/fire/messaging';

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
  private readonly _messaging: Messaging;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private authService: AuthService, 
    private snackBar: MatSnackBar,
    messaging: Messaging
  ) {
    this._messaging = messaging
  }

  ngOnInit(): void {
    this.updateLocalDateTime()
    this.navigateToTools()
    this.intervalId = setInterval(() => this.updateLocalDateTime(), 1000); 
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  username: string = "Rizki Esa Fadillah";
  imageuser: string = "/temp_item/bg_user.jpg";

  navigateToMonitoring() {
    this.router.navigate(['monitoring'], {relativeTo: this.route});
  }

  navigateToSensor() {
    this.router.navigate(['sensor/data', 'suhu'], {relativeTo: this.route});
  }

  navigateToTools() {
    this.router.navigate(['alat'], {relativeTo: this.route});
  }

  navigateToHistory() {
    this.router.navigate(['riwayat'], {relativeTo: this.route});
  }

  navigateToNotification() {
    this.router.navigate(['notifikasi'], {relativeTo: this.route});
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

  deleteDeviceToken(): Promise<void> {
    return deleteToken(this._messaging)
      .then(() => {
        this.logoutUser()
      })
      .catch((error) => {
        console.log('Error deleting device token:', error);
      });
  }
  

  logoutUser() {
    this.apiService.logout().subscribe({
      next: (response: PostResponse) => {
        this.authService.logout();
        this.snackBar.open(response.message, undefined, { duration: 2000 });
        this.router.navigate(['/']);;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
