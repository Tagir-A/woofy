import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAllBreedsComponent } from './list-all-breeds.component';
import { ApiResponse } from '../../types/api-response';
import { of } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { BreedFilterService } from '../../service/breed-filter.service';
import { ActivatedRoute } from '@angular/router';

describe('ListAllBreedsComponent', () => {
  let component: ListAllBreedsComponent;
  let fixture: ComponentFixture<ListAllBreedsComponent>;
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
    getRandomBreedImages: jasmine.createSpy().and.returnValue(
      of({
        message: ['https://example.com/image.jpg'],
        status: 'success',
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllBreedsComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAllBreedsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
