import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomImageComponent } from './random-image.component';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';

describe('RandomImageComponent', () => {
  let component: RandomImageComponent;
  let fixture: ComponentFixture<RandomImageComponent>;
  const apiServiceMock = {
    getAllBreeds: jasmine.createSpy().and.returnValue(
      of({
        message: {
          bulldog: ['english', 'french'],
        },
        status: 'success',
      })
    ),
    getRandomImage: jasmine.createSpy().and.returnValue(
      of({
        message: ['https://example.com/image.jpg'],
        status: 'success',
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomImageComponent],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
