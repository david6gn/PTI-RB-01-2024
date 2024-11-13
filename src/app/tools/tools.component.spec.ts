import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToolsComponent } from './tools.component';
import { ApiService } from '../../service/api.service';
import { SnackbarService } from '../../service/snackbar.service';
import { AuthService } from '../../service/auth.service';
import { LoadingService } from '../../service/loading.service';
import { of } from 'rxjs';

const mockApiService = {
  getToolsData: jasmine.createSpy('getToolsData').and.returnValue(of([]))
};
const mockSnackbarService = {};
const mockAuthService = {};
const mockLoadingService = {};

describe('ToolsComponent', () => {
  let component: ToolsComponent;
  let fixture: ComponentFixture<ToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ToolsComponent
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the tools component', () => {
    expect(component).toBeTruthy();
  });
});
