import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Messaging } from '@angular/fire/messaging';
import { AppComponent } from './app.component';
import { SocketService } from '../service/socket.service';
import { SnackbarService } from '../service/snackbar.service';


const mockMessaging = {

};
const mockSocketService = {

};
const mockSnackbarService = {

};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        MatSnackBarModule,
        AppComponent 
      ],
      providers: [
        { provide: Messaging, useValue: mockMessaging },
        { provide: SocketService, useValue: mockSocketService },
        { provide: SnackbarService, useValue: mockSnackbarService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });
});
