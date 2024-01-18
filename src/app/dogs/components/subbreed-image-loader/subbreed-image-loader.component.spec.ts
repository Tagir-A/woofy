import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubbreedImageLoaderComponent } from './subbreed-image-loader.component';
import { of } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { cacheInterceptor } from '../../../utils/cache.interceptor';

describe('SubbreedImageLoaderComponent', () => {
  let component: SubbreedImageLoaderComponent;
  let fixture: ComponentFixture<SubbreedImageLoaderComponent>;
  const apiServiceMock = {
    getAllBreeds: jasmine.createSpy().and.returnValue(
      of({
        message: {
          bulldog: ['english', 'french'],
        },
        status: 'success',
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubbreedImageLoaderComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        provideHttpClient(withInterceptors([cacheInterceptor])),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubbreedImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
