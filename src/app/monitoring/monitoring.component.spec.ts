import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonitoringComponent } from './monitoring.component';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../service/socket.service';
import { ChartService } from '../../service/chart.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Monitoringitem } from '../../models/monitoringitem';

class MockSocketService {
  onMessage = jasmine.createSpy().and.returnValue(of({})); 
  subscribe() {}
  unsubscribe() {}
}

class MockChartService {
  addData() {}  
  generateChart() {} 
}

class MockActivatedRoute {

  snapshot = { paramMap: { get: () => 'test' } };
}

describe('MonitoringComponent', () => {
  let component: MonitoringComponent;
  let fixture: ComponentFixture<MonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientModule, MonitoringComponent],
      providers: [
        { provide: SocketService, useClass: MockSocketService },
        { provide: ChartService, useClass: MockChartService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        ApiService, 
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the MonitoringComponent', () => {
    expect(component).toBeTruthy(); 
  });

  it('should render MonitoringItemComponent for each monitoring item', () => {
    const monitoringItems: Monitoringitem[] = [
      { sensorName: 'Sensor Suhu', sensorValue: '', chartId: 1, sensorId: 'temperature' },
      { sensorName: 'Sensor pH', sensorValue: '', chartId: 2, sensorId: 'ph' },
      { sensorName: 'Sensor Salinitas', sensorValue: '', chartId: 3, sensorId: 'salinity' },
      { sensorName: 'Sensor Kekeruhan', sensorValue: '', chartId: 4, sensorId: 'turbidity' }
    ];

    component.monitoringList = monitoringItems;
    fixture.detectChanges();

    const monitoringItemComponents = fixture.nativeElement.querySelectorAll('app-monitoring-item');
    expect(monitoringItemComponents.length).toBe(monitoringItems.length); 
  });
});
