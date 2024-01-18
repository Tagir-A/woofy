import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedImageLoaderComponent } from './breed-image-loader.component';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';

describe('BreedImageLoaderComponent', () => {
  let component: BreedImageLoaderComponent;
  let fixture: ComponentFixture<BreedImageLoaderComponent>;
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
      imports: [BreedImageLoaderComponent],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
