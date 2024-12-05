import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { LoginResponse } from '../../models/login-response';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { getToken, Messaging } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';
import { AuthService } from '../../service/auth.service';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule,ChangePasswordDialogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  private readonly _env = environment;
  private readonly _messaging: Messaging;
  isErrorVisible: boolean = false;
  isPasswordVisible: boolean = false; 
  errorText: string = "";

  username: string = '';
  password: string = '';
  private forceLogin = false;
  constructor(
    private router: Router, 
    private apiService: ApiService, 
    private snackBar: SnackbarService, 
    private dialog: MatDialog, 
    private authService: AuthService,
    messaging: Messaging,
    private loading: LoadingService,
    private notificationServie: NotificationService
  ) {
    this._messaging = messaging;
  }
  

  private async _getDeviceToken(retryCount: number = 2, delay: number = 500): Promise<void> {
    const timeout = 3000; 
    let timeoutReached = false;
  
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        timeoutReached = true;
        reject(new Error(`Request timeout exceeded ${timeout / 1000} seconds for service worker readiness`));
      }, timeout);
    });
  
    const attemptRequest = async (): Promise<void> => {
      try {
        const registration = await Promise.race([
          navigator.serviceWorker.ready,
          timeoutPromise,
        ]);
  
        if (timeoutReached) {
          throw new Error('Service worker registration timeout');
        }
  
        if (!registration) {
          throw new Error('Service worker registration failed or unavailable');
        }
  
        console.log('Service Worker registration:', registration);
  
        const token = await getToken(this._messaging, {
          vapidKey: this._env.vapidKey,
          serviceWorkerRegistration: registration,
        });
  
        if (!token) {
          throw new Error('Failed to retrieve FCM token');
        }
  
        this.authService.setFCMToken(token);
        this.loginUser();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Token error:', error.message);
  
          if (retryCount > 0) {
            console.log(`Retrying to get token, attempts left: ${retryCount - 1}`);
            await new Promise((resolve) => setTimeout(resolve, delay)); 
            await attemptRequest();
          } else {
            console.error('Failed to get token after retries.');
            throw error;
          }
        } else {
          console.error('Unexpected error:', error);
          throw error;
        }
      }
    };
  
    try {
      if (!this.forceLogin) {
        await attemptRequest();
      } else {
        this.loginUser();
      }
    } catch (error) {
      console.error('Operation failed or timeout:', error);
      this.loading.hideLoading(true, () => {
        this.forceLogin = true;
        this.snackBar.showSnackBar("Terjadi kesalahan pada service notifikasi. Tekan 'Login' lagi untuk melakukan login tanpa notifikasi.");
      });
    }
  }
  

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(message => {
      if(message !== null) {
        this.snackBar.showSnackBar(message);
      } 
    });
  }

  onSubmit() {
    if (!this.validateInputs()) {
      this.errorText = "Lengkapi input terlebih dahulu!";
      this.isErrorVisible = true;
    } else {
      if (!this.validatePassword()) {
        this.snackBar.showSnackBar("Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter khusus (seperti !, @, #, $, %, ^, &, *).")
        this.errorText = "Password tidak sesuai!";
        this.isErrorVisible = true;
      } else {
        if(this.notificationServie.checkPermission() === 'granted') {
          this.loading.showLoading();
          this._getDeviceToken();
          this.isErrorVisible = false;
        } else {
          this.forceLogin = true
          this.loading.showLoading();
          this._getDeviceToken();
        }
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return passwordRegex.test(this.password);
  }

  loginUser(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(this.username);  
    let data = {};
    const token = this.authService.getFCMToken();
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
        console.log(response)
        this.loading.hideLoading(response.error, () => {
          this.authService.login(response.token, response.userId, response.type);
          this.snackBar.showSnackBar(response.message);
          this.router.navigate(['/dashboard']);
        });
      },
      error: (error) => {
        this.loading.hideLoading(true)
        console.log(error.error.message);
        this.snackBar.showSnackBar(error.error.message);
      }
    });
  }
}
