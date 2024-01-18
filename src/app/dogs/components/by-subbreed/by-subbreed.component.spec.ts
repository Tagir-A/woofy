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

  it('should initialize with the correct default state', () => {
    expect(component.state).toEqual({ type: 'random' });
    expect(component.payload).toEqual({
      breed: 'bulldog',
      subbreed: 'english',
    });
    expect(component.count).toEqual(1);
  });

  it('should update the state type correctly', () => {
    component.updateStateType('all');
    expect(component.state).toEqual({ type: 'all' });

    component.updateStateType('random');
    expect(component.state).toEqual({ type: 'random' });
  });
});
