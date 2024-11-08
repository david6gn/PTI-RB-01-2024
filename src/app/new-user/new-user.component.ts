import { Component, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../service/api.service';
import { NewUserResponse } from '../../models/new-user-response';
import { PostResponse } from '../../models/post-response';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOtpInputModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  @ViewChild("ngOtpInput") ngOtpInput: any;
  name: string = '';
  email: string = '';
  username: string = '';
  role: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  isOTPsent: boolean = false;
  isPasswordVisible: boolean[] = [false, false];
  newUserResponse: NewUserResponse | undefined;

  constructor(private snackBar: SnackbarService, private apiService: ApiService, private location: Location){}

  togglePasswordVisibility(num: number) {
    this.isPasswordVisible[num] = !this.isPasswordVisible[num]
  }

  validateInput() {
    if(this.checkEmptyInputs()) {
      if(this.checkPassword()) {
        this.addNewUser();
      } else {
        this.snackBar.showSnackBar("Konfirmasi password tidak sesuai!");
      }
    } else {
      this.snackBar.showSnackBar("Lengkapi input terlebih dahulu!");
    }
  }

  checkEmptyInputs(): boolean {
    if (this.name !== '' && this.email !== '' && this.username !== '' && this.role !== '' && this.password !== '' && this.passwordConfirmation !== '') {
      return true;
    }
    return false;
  }

  checkPassword(): boolean {
    if (this.password === this.passwordConfirmation) {
      return true;
    } else {
      return false;
    }
  }

  addNewUser() {
    const data = {
      user_email: this.email,
      user_username: this.username,
      user_password: this.password,
      user_name: this.name,
      user_type: this.role
    }

    this.apiService.addNewUser(data).subscribe({
      next: (response: NewUserResponse) => {
        if(!response.error) {
          this.newUserResponse = response;
          this.isOTPsent = true;
          this.snackBar.showSnackBar(response.message);
        } else {
          this.snackBar.showSnackBar(response.message);
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  verifyOTP(): void {
    if (this.newUserResponse === undefined) {
      this.snackBar.showSnackBar("Lakukan registerasi akun terlebih dahulu!");
      return;
    }
    if (this.ngOtpInput.currentVal.length !== 4) {
      this.snackBar.showSnackBar("Lengkapi kode OTP terlebih dahulu!");
      return;
    }

    const data = {
      OTP: this.ngOtpInput.currentVal
    }

    this.apiService.verifyNewUser(data, this.newUserResponse.userId).subscribe({
      next: (response: PostResponse) => {
        console.log(response)
        if (!response.error) {
          this.snackBar.showSnackBar(response.message);
          this.snackBar.showSnackBar("Akun berhasil dibuat!");
          this.location.back()
        } else {
          this.snackBar.showSnackBar(response.message);
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
