import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const session = localStorage.getItem('session');
    return session !== null && session !== '';
  }

  login(token: string, userId: string, userType: string) {
    localStorage.setItem('session', 'logged');
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  getUserType(): string {
    return localStorage.getItem('userType') ?? '';
  }

  logout() {
    localStorage.clear();
  }
}
