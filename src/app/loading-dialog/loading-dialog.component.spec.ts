import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingDialogComponent } from './loading-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';
import { LoadingService } from '../../service/loading.service';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

// Mock services
class MockLoadingService {
  loading$ = of(true);
  error$ = of(false);  
}

class MockMatDialogRef {
  close() {}
}

describe('LoadingDialogComponent', () => {
  let component: LoadingDialogComponent;
  let fixture: ComponentFixture<LoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
        CommonModule,
        LottieComponent,
      ],
      providers: [
        { provide: LoadingService, useClass: MockLoadingService },
        { provide: MatDialogRef, useClass: MockMatDialogRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
