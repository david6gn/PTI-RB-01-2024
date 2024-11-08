import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NotificationItem, NotificationResponse } from '../../models/notification-response';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NotificationDetail, NotificationDetailResponse } from '../../models/notification-detail-response';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notificationList: NotificationItem[] = [];
  page: number = 1;
  limit: number = 6;
  status: string = 'high';

  notificationDetail: NotificationDetail = {
    id: '',
    timestamp: '',
    read: false,
    level: '',
    title: '',
    body: ''
  };

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getNotificationList().subscribe({
      next: (response: NotificationResponse) => {
        console.log(response);
        this.notificationList = response.data.notifications.reverse();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days < 7) return `${days} hari yang lalu`;
    return `${weeks} minggu yang lalu`;
  }

  getNotificationDetail(id: string) {
    this.apiService.getNotificationDetail(id).subscribe({
      next: (response: NotificationDetailResponse) => {
        this.status = response.data.level;
        this.notificationDetail = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
