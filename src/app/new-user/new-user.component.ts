import { Component, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../service/api.service';
import { NewUserResponse } from '../../models/new-user-response';
import { PostResponse } from '../../models/post-response';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';

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

  constructor(
    private snackBar: SnackbarService, 
    private apiService: ApiService, 
    private location: Location,
    private loading: LoadingService
  ){}

  togglePasswordVisibility(num: number) {
    this.isPasswordVisible[num] = !this.isPasswordVisible[num]
  }

  validateInput() {
    if(this.checkEmptyInputs()) {
      if(this.checkPassword()) {
        if (!this.validatePassword()) {
          this.snackBar.showSnackBar("Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter khusus (seperti !, @, #, $, %, ^, &, *).");
        } else {
          this.addNewUser();
        }
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

  validatePassword(): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return passwordRegex.test(this.password);
  }

  addNewUser() {
    const data = {
      user_email: this.email,
      user_username: this.username,
      user_password: this.password,
      user_name: this.name,
      user_type: this.role
    }

    this.loading.showLoading();

    this.apiService.addNewUser(data).subscribe({
      next: (response: NewUserResponse) => {
        if(!response.error) {
          this.loading.hideLoading(response.error, () => {
            this.newUserResponse = response
            this.isOTPsent = true;
          });
        } else {
          this.loading.hideLoading(response.error, () => {
            this.snackBar.showSnackBar(response.message);
          });
        }
      },
      error: (error) => {
        this.loading.hideLoading(true, () => {
          this.snackBar.showSnackBar(error.error.message);
        });
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

    this.loading.showLoading();

    this.apiService.verifyNewUser(data, this.newUserResponse.userId).subscribe({
      next: (response: PostResponse) => {
        console.log(response)
        if (!response.error) {
          this.loading.hideLoading(response.error, () => {
            this.snackBar.showSnackBar(`${response.message} dan akun berhasil dibuat.`);
            this.location.back()
          });
        } else {
          this.loading.hideLoading(response.error, () => {
            this.snackBar.showSnackBar(response.message);
          });
        }
      },
      error: (error) => {
        this.loading.hideLoading(true, () => {
          this.snackBar.showSnackBar(error.error.message);
        });
      }
    })
  }
}
