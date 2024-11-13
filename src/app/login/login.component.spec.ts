import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import { ApiService } from '../../service/api.service';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';
import { of } from 'rxjs';
import { Messaging } from '@angular/fire/messaging'; 

class MockAuthService {
  setFCMToken() {}
  getFCMToken() { return 'mock-token'; }
  login() {}
}

class MockApiService {
  login() {
    return of({
      token: 'mock-token',
      userId: 'mock-user-id',
      type: 'mock-type',
      message: 'Login Successful'
    });
  }
}

class MockSnackbarService {
  showSnackBar(message: string) {}
}

class MockLoadingService {
  showLoading() {}
  hideLoading() {}
}

class MockMessaging {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        LoginComponent 
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: ApiService, useClass: MockApiService },
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: LoadingService, useClass: MockLoadingService },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: Messaging, useClass: MockMessaging }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
