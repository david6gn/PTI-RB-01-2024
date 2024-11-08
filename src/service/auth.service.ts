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

  login(token: string, userId: string) {
    localStorage.setItem('session', 'logged');
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId)
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
  }
}
