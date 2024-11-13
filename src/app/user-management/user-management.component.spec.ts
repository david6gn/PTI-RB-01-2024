import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserManagementComponent } from './user-management.component';
import { ApiService } from '../../service/api.service';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';
import { AuthService } from '../../service/auth.service';
import { of } from 'rxjs';

const mockApiService = {
  getUserList: jasmine.createSpy('getUserList').and.returnValue(of([]))
};
const mockSnackbarService = {};
const mockLoadingService = {};
const mockAuthService = {};

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgxPaginationModule,
        RouterTestingModule,
        UserManagementComponent
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialog, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user management component', () => {
    expect(component).toBeTruthy();
  });
});
