import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService, private snackBar: MatSnackBar) {}
  isErrorVisible: boolean = false
  isPasswordVisible: boolean = false; 
  errorText: string = "";

  username: string = '';
  password: string = '';

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
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
    const data = {
      username: this.username,
      password: this.password,
      notification_token: "test12345"
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
