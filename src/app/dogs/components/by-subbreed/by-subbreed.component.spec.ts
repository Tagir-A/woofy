import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySubbreedComponent } from './by-subbreed.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../service/api.service';

describe('BySubbreedComponent', () => {
  let component: BySubbreedComponent;
  let fixture: ComponentFixture<BySubbreedComponent>;
  const mockActivatedRoute = {
    snapshot: {
      queryParams: {
        breed: 'bulldog',
        subbreed: 'english',
      },
    },
  };
  const apiServiceMock = {
    getAllBreeds: jasmine.createSpy().and.returnValue(
      of({
        message: {
          bulldog: ['english', 'french'],
        },
        status: 'success',
      })
    ),
    getRandomSubbreedImages: jasmine.createSpy().and.returnValue(
      of({
        message: ['https://example.com/image.jpg'],
        status: 'success',
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BySubbreedComponent, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: apiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BySubbreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
