import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Messaging, onMessage } from '@angular/fire/messaging';
import { SocketService } from '../service/socket.service';

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
  constructor(messaging: Messaging, private snackBar: MatSnackBar, private socketService: SocketService){
    this._messaging = messaging
  }

  ngOnInit(): void {
    this._onMessage();
    this.socketService.connectToWebSocket()
  }

  private _onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => {
        this.showSnackBar(String(payload.notification?.body))
      },
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 2000 });
  }

  ngOnDestroy(): void {
    console.log("on destroy app component")
    this.socketService.closeConnection()
  }
}
