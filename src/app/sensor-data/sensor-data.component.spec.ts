import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorDataComponent } from './sensor-data.component';
import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizeFirstCharPipe } from '../../pipe/capitalize-first-char.pipe';
import { CapitalizeLastCharPipe } from '../../pipe/capitalize-last-char.pipe';
import { ChartService } from '../../service/chart.service';
import { SocketService } from '../../service/socket.service';
import { ApiService } from '../../service/api.service';
import { SnackbarService } from '../../service/snackbar.service';
import { LoadingService } from '../../service/loading.service';
import { AuthService } from '../../service/auth.service';
import { of } from 'rxjs';

const mockChartService = {};
const mockSocketService = {
  onMessage: jasmine.createSpy('onMessage').and.returnValue(of([])),
  unsubscribe: jasmine.createSpy('unsubscribe')
};
const mockApiService = {};
const mockSnackbarService = {};
const mockLoadingService = {};
const mockAuthService = {};
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1')
    }
  },
  params: of({ id: '1' })
};
const mockRouter = {};

describe('SensorDataComponent', () => {
  let component: SensorDataComponent;
  let fixture: ComponentFixture<SensorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChartModule,
        FormsModule,
        SensorDataComponent
      ],
      providers: [
        { provide: ChartService, useValue: mockChartService },
        { provide: SocketService, useValue: mockSocketService },
        { provide: ApiService, useValue: mockApiService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        CapitalizeFirstCharPipe,
        CapitalizeLastCharPipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the sensor data component', () => {
    expect(component).toBeTruthy();
  });
});
