import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { SnackbarService } from '../../service/snackbar.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';

const mockApiService = {
  getNotificationList: jasmine.createSpy('getNotificationList').and.returnValue(of([]))
};

const mockSnackbarService = {
  openSnackBar: jasmine.createSpy('openSnackBar')
};

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NgxPaginationModule
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: SnackbarService, useValue: mockSnackbarService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the notification component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNotificationList on init', () => {
    expect(mockApiService.getNotificationList).toHaveBeenCalled();
  });
});
