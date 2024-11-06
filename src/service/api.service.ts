import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginResponse } from '../models/login-response';
import { PostResponse } from '../models/post-response';
import { SensorResponse } from '../models/sensor-response';
import { ToolsResponse } from '../models/tools-response';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }
    
    return this.http.post<LoginResponse>(`${this.baseURL}auth/login`, body, { headers });
  }

  logout(): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseURL}auth/logout`);
  }

  requestOTP(data: any): Observable<PostResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.post<PostResponse>(`${this.baseURL}auth/forget`, body, {headers});
  }

  verifyOTP(data: any): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.post<LoginResponse>(`${this.baseURL}auth/verify`, body, { headers });
  }

  changePassword(data: any): Observable<PostResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.patch<LoginResponse>(`${this.baseURL}users/password`, body, { headers });
  }

  getSensorData(sensorId: string): Observable<SensorResponse> {
    return this.http.get<SensorResponse>(`${this.baseURL}configuration/${sensorId}`);
  }

  startSensor(sensorId: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseURL}configuration/${sensorId}/start`);
  }

  stopSensor(sensorId: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseURL}configuration/${sensorId}/stop`);
  }

  updateSensorSetting(data: any, sensorId: string): Observable<PostResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.put<PostResponse>(`${this.baseURL}configuration/${sensorId}`, body, { headers });
  }

  getToolsData(): Observable<ToolsResponse> {
    return this.http.get<ToolsResponse>(`${this.baseURL}configuration/actuator`);
  }

  updateFeederSetting(data: any): Observable<PostResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.put<PostResponse>(`${this.baseURL}configuration/feeder/schedule`, body, { headers });
  }

  updateAeratorSetting(data: any): Observable<PostResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.put<PostResponse>(`${this.baseURL}configuration/aerator/schedule`, body, {headers});
  }
}
