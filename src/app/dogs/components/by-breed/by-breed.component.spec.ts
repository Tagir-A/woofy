import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByBreedComponent } from './by-breed.component';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ByBreedComponent', () => {
  let component: ByBreedComponent;
  let fixture: ComponentFixture<ByBreedComponent>;
  const apiServiceMock = {
    getAllBreeds: jasmine.createSpy().and.returnValue(
      of({
        message: {
          bulldog: ['english', 'french'],
        },
        status: 'success',
      })
    ),
    getRandomBreedImages: jasmine.createSpy().and.returnValue(
      of({
        message: ['https://example.com/image.jpg'],
        status: 'success',
      })
    ),
  };
  const mockActivatedRoute = {
    snapshot: {
      queryParams: {
        breed: 'bulldog',
        subbreed: 'english',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByBreedComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ByBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
