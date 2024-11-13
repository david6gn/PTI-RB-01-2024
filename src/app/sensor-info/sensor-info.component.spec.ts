import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorInfoComponent } from './sensor-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1')
    }
  },
  params: of({ id: '1' })
};
const mockRouter = {};

describe('SensorInfoComponent', () => {
  let component: SensorInfoComponent;
  let fixture: ComponentFixture<SensorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SensorInfoComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sensor info component', () => {
    expect(component).toBeTruthy();
  });
});
