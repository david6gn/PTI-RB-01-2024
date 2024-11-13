import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostResponse } from '../../models/post-response';
import { AuthService } from '../../service/auth.service';
import { Messaging, deleteToken } from '@angular/fire/messaging';
import { CommonModule } from '@angular/common';
import { UserItem } from '../../models/user-response';
import { UserDetailResponse } from '../../models/user-detail-response';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  time: string = '';
  date: string = '';
  private intervalId: any;
  private readonly _messaging: Messaging;
  name: string = '';
  type: string = '';
  gif: string [] = ["https://media.tenor.com/uwFCK7sFjYUAAAAd/wow-amazing.gif", "bg_user.jpg"];
  imageuser: string = this.gif[Math.floor(Math.random() * this.gif.length)];
  isAdmin: boolean

  constructor(
    private router: Router, 
    public route: ActivatedRoute, 
    private apiService: ApiService,
    private authService: AuthService, 
    private snackBar: SnackbarService,
    messaging: Messaging,
    private loading: LoadingService
  ) {
    this._messaging = messaging
    const type = this.authService.getUserType();

    if (type === "admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  ngOnInit(): void {
    this.getUserDetail();
    this.updateLocalDateTime();
    this.navigateToMonitoring();
    this.intervalId = setInterval(() => this.updateLocalDateTime(), 1000); 
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

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

  navigateToUserManagement() {
    this.router.navigate(['manajemen'], {relativeTo: this.route});
  }

  updateLocalDateTime() {
    const now = new Date();
  
    this.date = this.formatDate(now);
  
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const time = now.toLocaleTimeString('en-GB', options);
  
    this.time = `${time} WIB`
  }
  
  
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
  
    const formatter = new Intl.DateTimeFormat('id-ID', options);
    return formatter.format(date);
  }

  async deleteDeviceToken(): Promise<void> {
    this.loading.showLoading()
    if (this.authService.getFCMToken() === 'xxxx') {
      this.logoutUser()
      return;
    }
    return deleteToken(this._messaging)
      .then(() => {
        this.logoutUser()
      })
      .catch((error) => {
        console.log('Error deleting device token:', error);
      });
  }

  getUserDetail() {
    const userId = this.authService.getUserId();
    this.apiService.getUserDetail(userId).subscribe({
      next: (response: UserDetailResponse) => {
        this.name = response.data.name;
        this.type = response.data.type;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  

  logoutUser() {
    this.apiService.logout().subscribe({
      next: (response: PostResponse) => {
        this.loading.hideLoading(response.error, () => {
          this.authService.logout();
          this.snackBar.showSnackBar(response.message);
          this.router.navigate(['/']);;
        });
      },
      error: (error) => {
        this.loading.hideLoading(true)
        this.snackBar.showSnackBar(error.error.message);
        console.log(error);
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const stickyHeader = document.querySelector('.sticky-item-top') as HTMLElement;
    const container = document.querySelector('.container-main') as HTMLElement;
    
    if (stickyHeader) {
      const containerRect = container.getBoundingClientRect();
      const stickyRect = stickyHeader.getBoundingClientRect();

      
      if (containerRect.top <= stickyRect.bottom) {
        stickyHeader.classList.add('scrolled');
      } else {
        stickyHeader.classList.remove('scrolled');
      }
    }
  }
}
