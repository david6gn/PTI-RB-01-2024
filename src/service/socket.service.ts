import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private baseURL: string;
  private token: string;
  private socketURL: WebSocket;
  constructor(authService: AuthService) { 
    this.token = authService.getToken();
    this.baseURL = environment.apiUrl;
    this.socketURL = new WebSocket(`${this.baseURL}ws?token=${this.token}`);
    
    this.socketURL.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    this.socketURL.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    this.socketURL.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  public onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socketURL.onmessage = (event) => {
        const message = JSON.parse(event.data);
        observer.next(message);
      };
    });
  }

  subscribe() {
      if(this.socketURL.readyState === WebSocket.OPEN) {
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'temperature' }));
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'pH' }));
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'salinity' }));
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'turbidity' }));
      } else {
        this.socketURL.onopen = () => {
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'temperature' }));
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'pH' }));
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'salinity' }));
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'turbidity' }));
      };
    }
  }

  unsubscribe() {
    if(this.socketURL.readyState === WebSocket.OPEN) {
      this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'temperature' }));
      this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'pH' }));
      this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'salinity' }));
      this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'turbidity' }));
    } else {
      this.socketURL.onopen = () => {
        this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'temperature' }));
        this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'pH' }));
        this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'salinity' }));
        this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'turbidity' }));
      }
    }
  }
  
  subscribeTemperature() {
      if(this.socketURL.readyState === WebSocket.OPEN) {
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'temperature' }));
      } else {
        this.socketURL.onopen = () => {
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'temperature' }));
      };
    }
  }

  subscribePH() {
      if(this.socketURL.readyState === WebSocket.OPEN) {
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'pH' }));
      } else {
        this.socketURL.onopen = () => {
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'pH' }));
      };
    }
  }

  subscribeSalinity() {
      if(this.socketURL.readyState === WebSocket.OPEN) {
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'salinity' }));
      } else {
        this.socketURL.onopen = () => {
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'salinity' }));
      };
    }
  }

  subscribeTurbidity() {
      if(this.socketURL.readyState === WebSocket.OPEN) {
        this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'turbidity' }));
      } else {
        this.socketURL.onopen = () => {
          this.socketURL.send(JSON.stringify({ action: 'subscribe', sensorType: 'turbidity' }));
      };
    }
  }

  unsubscribeTemperature() {
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'temperature' }));
  }

  unsubscribePH() {
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'pH' }));
  }

  unsubscribeSalinity() {
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'salinity' }));
  }

  unsubscribeTurbidity() {
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'turbidity' }));
  }
}
