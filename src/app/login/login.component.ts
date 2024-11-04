import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse } from '../../models/login-response';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, DialogChangePasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService, private snackBar: MatSnackBar, private dialog: MatDialog) {}
  isErrorVisible: boolean = false
  isPasswordVisible: boolean = false; 
  errorText: string = "";

  username: string = '';
  password: string = '';

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
      this.errorText = "Lengkapi input terlebih dahulu!"
      this.isErrorVisible = true
    } else {
      if (!this.validatePassword()) {
        this.errorText = "Password tidak boleh dibawah 8 karakter!"
        this.isErrorVisible = true
      }  else {
        this.loginUser()
        this.isErrorVisible = false
      }
    }
  }

  validateInputs(): boolean {
    if (this.username.length != 0 && this.password.length != 0) {
      return true
    } else {
      return false
    }
  }

  validatePassword(): boolean {
    if (this.password.length >= 8) {
      return true
    } else {
      return false
    }
  }

  loginUser(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(this.username);  
    let data = {}
    if(isValidEmail) {
      data = {
        email: this.username,
        password: this.password,
        notification_token: "test12345"
      }
    }else {
      data = {
        username: this.username,
        password: this.password,
        notification_token: "test12345"
      }
    }
    this.apiService.login(data).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        this.snackBar.open(response.message, undefined, { duration: 2000 });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
