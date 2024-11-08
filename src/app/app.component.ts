import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Messaging, onMessage } from '@angular/fire/messaging';
import { SocketService } from '../service/socket.service';
import { SnackbarService } from '../service/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { 
  title = 'pti-sadewafarm';

  private readonly _messaging: Messaging
  constructor(messaging: Messaging, private snackBar: SnackbarService){
    this._messaging = messaging
  }

  ngOnInit(): void {
    this._requestNotificationPermission().then((permissionGranted) => {
      if (permissionGranted) {
        if ('serviceWorker' in navigator) {
          console.log("serviceworker true");
          navigator.serviceWorker.register('./firebase-messaging-sw.js')
          .then((reg) => console.log("service worker registered", reg))
          .catch((err) => console.log("service worker not registered", err))
          // window.addEventListener('load', () => {
          //   navigator.serviceWorker.register('./firebase-messaging-sw.js', { scope: "/" })
          //     .then((registration) => {
          //       console.log('Service Worker registered with scope:', registration.scope);
          //     })
          //     .catch((error) => {
          //       console.log('Service Worker registration failed:', error);
          //     });
          // });
          this._onMessage();
        };
      } else {
        this.snackBar.showSnackBar("Notifikasi website tidak dapat ditampilkan, mohon izinkan notifikasi untuk mendapatkan notifikasi website");
      }
    });
  }

  private _requestNotificationPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  private _onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => {
        this.snackBar.showSnackBar(String(payload.notification?.body))
      },
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }
  

  ngOnDestroy(): void {
  }
}
