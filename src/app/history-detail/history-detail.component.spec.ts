import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryDetailComponent } from './history-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

describe('HistoryDetailComponent', () => {
  let component: HistoryDetailComponent;
  let fixture: ComponentFixture<HistoryDetailComponent>;

  beforeEach(() => {
    const mockHistory = {
      log: [
        { time: '2024-11-13T10:00:00Z', temperature: 25, temperature_status: 'normal', temperature_info: 'info1', ph: 7, ph_status: 'normal', ph_info: 'info2', salinity: 35, salinity_status: 'normal', salinity_info: 'info3', turbidity: 2, turbidity_status: 'normal', turbidity_info: 'info4' }
      ]
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        NgxPaginationModule,  
        CommonModule,         
        HistoryDetailComponent
      ],
      providers: [
        { 
          provide: Router, 
          useValue: { 
            getCurrentNavigation: jasmine.createSpy().and.returnValue({
              extras: { state: { history: mockHistory } } 
            })
          }
        }
      ]
    });

    fixture = TestBed.createComponent(HistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
