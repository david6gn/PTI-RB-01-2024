import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Messaging, onMessage } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = 'pti-sadewafarm';

  private readonly _messaging: Messaging
  constructor(messaging: Messaging, private snackBar: MatSnackBar){
    this._messaging = messaging
  }

  ngOnInit(): void {
    this._onMessage();
  }

  private _onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => {
        this.showSnackBar(String(payload.notification?.body))
        console.log(payload)
      },
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 2000 });
  }
}
