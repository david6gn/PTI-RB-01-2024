import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}
  isErrorVisible: boolean = false
  isPasswordVisible: boolean = false; 
  errorText: string = "";

  username: string = '';
  password: string = '';

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; // Toggle status
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
        this.validateCredential()
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

  validateCredential() {
    //Validate
    this.router.navigate(['/dashboard'])
  }

}
