import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private baseURL = environment.apiUrl;
  private token = localStorage.getItem('token');
  private socketURL = new WebSocket(`${this.baseURL}ws?token=${this.token}`);

  constructor() { 

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
    if (this.socketURL.readyState === WebSocket.OPEN) {
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
  

  public unsubscribe(): void {
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'temperature' }));
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'pH' }));
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'salinity' }));
    this.socketURL.send(JSON.stringify({ action: 'unsubscribe', sensorType: 'turbidity' }));
  }
}
