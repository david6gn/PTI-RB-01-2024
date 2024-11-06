import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse } from '../../models/login-response';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';
import { getToken, Messaging, deleteToken } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, DialogChangePasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  private readonly _env = environment;
  private readonly _messaging: Messaging;
  isErrorVisible: boolean = false;
  isPasswordVisible: boolean = false; 
  errorText: string = "";

  username: string = '';
  password: string = '';
  constructor(
    private router: Router, 
    private apiService: ApiService, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private authService: AuthService,
    messaging: Messaging
  ) {
    this._messaging = messaging;
  }

  ngOnInit(): void {
    this._requestNotificationPermission();
  }

  private _requestNotificationPermission(): void {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        this._getDeviceToken();
      } else {
        this.snackBar.open("Notifikasi website tidak dapat ditampilkan, mohon izinkan notifikasi untuk mendapatkan notifikasi website", undefined, { duration: 2000 });
      }
    });
  }


  private _getDeviceToken(): void {
    deleteToken(this._messaging)
      .then(() => {
        return getToken(this._messaging, { vapidKey: this._env.vapidKey });
      })
      .then((token) => {
        localStorage.setItem('fcm_token', token);
        console.log(token);
      })
      .catch((error) => {
        console.log('Token error:', error);
      });
  }


  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(message => {
      if(message !== null) {
        this.snackBar.open(message, undefined, { duration: 2000 });
      } 
    });
  }

  onSubmit() {
    if (!this.validateInputs()) {
      this.errorText = "Lengkapi input terlebih dahulu!";
      this.isErrorVisible = true;
    } else {
      if (!this.validatePassword()) {
        this.errorText = "Password tidak boleh dibawah 8 karakter!";
        this.isErrorVisible = true;
      }  else {
        this.loginUser();
        this.isErrorVisible = false;
      }
    }
  }

  validateInputs(): boolean {
    if (this.username.length != 0 && this.password.length != 0) {
      return true;
    } else {
      return false;
    }
  }

  validatePassword(): boolean {
    if (this.password.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

  loginUser(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(this.username);  
    let data = {};
    const token = localStorage.getItem('fcm_token');
    if(isValidEmail) {
      data = {
        email: this.username,
        password: this.password,
        notification_token: token
      }
    }else {
      data = {
        username: this.username,
        password: this.password,
        notification_token: token
      }
    }
    this.apiService.login(data).subscribe({
      next: (response: LoginResponse) => {
        this.authService.login(response.token);
        this.snackBar.open(response.message, undefined, { duration: 2000 });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
