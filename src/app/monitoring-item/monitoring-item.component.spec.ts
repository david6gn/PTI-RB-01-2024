import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitoringItemComponent } from './monitoring-item.component';
import { Monitoringitem } from '../../models/monitoringitem';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

describe('MonitoringItemComponent', () => {
  let component: MonitoringItemComponent;
  let fixture: ComponentFixture<MonitoringItemComponent>;

  const mockMonitoringItem: Monitoringitem = {
    sensorName: 'Temperature',
    sensorValue: '25°C',
    chartId: 1,
    sensorId: 'sensor1'
  };

  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: { get: () => 'some-param' }
      }
    };

    await TestBed.configureTestingModule({
      imports: [MonitoringItemComponent, CommonModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ApiService 
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringItemComponent);
    component = fixture.componentInstance;

    component.monitoringItem = mockMonitoringItem;
    fixture.detectChanges();  
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
