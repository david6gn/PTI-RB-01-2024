import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewUserComponent } from './new-user.component';
import { ApiService } from '../../service/api.service';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    snackbarService = jasmine.createSpyObj('SnackbarService', ['showSnackBar']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule, 
        FormsModule, 
        NgOtpInputModule, 
        HttpClientTestingModule
      ],
      providers: [
        { provide: SnackbarService, useValue: snackbarService },
        { provide: ApiService, useValue: jasmine.createSpyObj('ApiService', ['addNewUser']) },
        { provide: LoadingService, useValue: jasmine.createSpyObj('LoadingService', ['showLoading', 'hideLoading']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the NewUserComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error message when password and password confirmation do not match', () => {
    component.name = 'John Doe';
    component.email = 'john.doe@example.com';
    component.username = 'johndoe';
    component.role = 'admin';
    component.password = 'Password123!';
    component.passwordConfirmation = 'Password456!';

    component.validateInput();

    expect(snackbarService.showSnackBar).toHaveBeenCalledWith('Konfirmasi password tidak sesuai!');
  });
});
