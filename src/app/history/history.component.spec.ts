import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { ApiService } from '../../service/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let apiServiceMock: any;

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getHistoryList']);
    apiServiceMock.getHistoryList.and.returnValue(of({ 
      data: { histories: [] }, 
      total_pages: 1 
    }));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        CommonModule,
        HistoryComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }
      ]
    });

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
