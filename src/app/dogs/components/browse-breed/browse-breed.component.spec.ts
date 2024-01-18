import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBreedComponent } from './browse-breed.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';

describe('BrowseBreedComponent', () => {
  let component: BrowseBreedComponent;
  let fixture: ComponentFixture<BrowseBreedComponent>;
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
      imports: [BrowseBreedComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: apiServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
