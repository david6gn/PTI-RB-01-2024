import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  checkPermission(): string {
    return Notification.permission;
  }

  requestPermission(): Promise<string> {
    return Notification.requestPermission();
  }

}
