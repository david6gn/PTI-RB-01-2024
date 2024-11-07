import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginResponse } from '../models/login-response';
import { PostResponse } from '../models/post-response';
import { SensorResponse } from '../models/sensor-response';
import { ToolsResponse } from '../models/tools-response';
import { HistoryResponse } from '../models/history-response';
import { NotificationResponse } from '../models/notification-response';
import { NotificationDetailResponse } from '../models/notification-detail-response';
import { UserResponse } from '../models/user-response';
import { NewUserResponse } from '../models/new-user-response';


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

  getHistoryList(queryParams: any): Observable<HistoryResponse> {
    const queryParamsString = new URLSearchParams(queryParams).toString();
    const urlWithQuery = `${this.baseURL}histories?${queryParamsString}`;

    return this.http.get<HistoryResponse>(urlWithQuery);
  }

  getNotificationList(): Observable<NotificationResponse> {
    return this.http.get<NotificationResponse>(`${this.baseURL}notifications`);
  }

  getNotificationDetail(id: string): Observable<NotificationDetailResponse> {
    return this.http.get<NotificationDetailResponse>(`${this.baseURL}notifications/${id}`);
  }

  getUserList(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseURL}users`);
  }

  addNewUser(data: any): Observable<NewUserResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }
    return this.http.post<NewUserResponse>(`${this.baseURL}users`, body, {headers});
  }

  verifyNewUser(data: any, userId: string): Observable<PostResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    return this.http.post<PostResponse>(`${this.baseURL}users/${userId}/verify`, body, { headers })
  }
}
