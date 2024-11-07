import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { PostResponse } from '../../models/post-response';
import { NgOtpInputModule } from 'ng-otp-input';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-dialog-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    NgOtpInputModule
  ],
  templateUrl: './dialog-change-password.component.html',
  styleUrl: './dialog-change-password.component.css'
})
export class DialogChangePasswordComponent {

  @ViewChild("ngOtpInput") ngOtpInput: any;
  isEmailSent: boolean = false;
  email: string = '';
  changePasswordStatus: boolean = false;
  password: string = '';
  isErrorVisible: boolean = false
  isPasswordVisible: boolean = false; 

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  constructor(
    private dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    private apiService: ApiService
  ) {
  }

  onClose(message: string): void {
    this.dialogRef.close(message); 
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  requestOTP(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(this.email)) {
      alert("Inputkan email yang valid!")
      return
    }
    const data = {
      user_email: this.email
    }
    this.apiService.requestOTP(data).subscribe({
      next: (response: PostResponse) => {
        if(response.error === true) {
          alert(response.message)
        } else {
          this.isEmailSent = true;
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  submitOTP() {
    if (!this.isEmailSent) {
      alert("Minta kode OTP dari email terlebih dahulu!");
    } else {
      if (this.ngOtpInput.currentVal.length !== 4) {
        alert("Lengkapi kode terlebih dahulu!")
      } else {
        console.log(this.ngOtpInput.currentVal)
        const data = {
          user_email: this.email,
          OTP: this.ngOtpInput.currentVal
        }
        this.apiService.verifyOTP(data).subscribe({
          next:(response: LoginResponse) => {
            if(response.error === true) {
              alert(response.message)
            } else {
              localStorage.setItem('token', response.token);
              this.changePasswordStatus = true;
            }
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    }
  }

  changePassword(): void {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(this.password)) {
      alert("Password minimal harus 8 karakter serta mengandung minimal 1 angka dan huruf!")
      return
    }
    const data = {
      new_password: this.password
    }

    this.apiService.changePassword(data).subscribe({
      next: (response: PostResponse) => {
        if(response.error === true) {
          alert(response.message)
        } else {
          localStorage.clear()
          this.onClose(response.message)
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
