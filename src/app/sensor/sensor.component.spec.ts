import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorComponent } from './sensor.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { CapitalizeFirstCharPipe } from '../../pipe/capitalize-first-char.pipe';
import { CapitalizeLastCharPipe } from '../../pipe/capitalize-last-char.pipe';
import { of } from 'rxjs';

const mockSharedService = {};

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1')
    },
    children: []
  },
  params: of({ id: '1' })
};

const mockRouter = {
  url: '/sensor/suhu/data',
  parseUrl: jasmine.createSpy('parseUrl').and.callFake(() => ({
    root: {
      children: {
        primary: {
          segments: [
            { path: 'sensor' },
            { path: 'suhu' },
            { path: 'data' }
          ]
        }
      }
    }
  })),
  navigate: jasmine.createSpy('navigate')
};

describe('SensorComponent', () => {
  let component: SensorComponent;
  let fixture: ComponentFixture<SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        CapitalizeFirstCharPipe,
        CapitalizeLastCharPipe
      ],
      providers: [
        { provide: SharedService, useValue: mockSharedService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sensor component', () => {
    expect(component).toBeTruthy();
  });
});
