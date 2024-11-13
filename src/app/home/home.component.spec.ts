import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { LoadingService } from '../../service/loading.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Messaging } from '@angular/fire/messaging';

class MockLoadingService {
  showLoading() {}
  hideLoading(isError: boolean, callback?: () => void) {
    if (callback) {
      callback();
    }
  }
}

class MockActivatedRoute {
  get queryParams() {
    return { subscribe: (fn: Function) => fn({}) };
  }
}

class MockMessaging {
  sendMessage() {}
  receiveMessage() {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: LoadingService, useClass: MockLoadingService },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Messaging, useClass: MockMessaging },
        ApiService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
