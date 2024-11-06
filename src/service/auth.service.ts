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

  login(token: string) {
    localStorage.setItem('session', 'logged');
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
  }
}
