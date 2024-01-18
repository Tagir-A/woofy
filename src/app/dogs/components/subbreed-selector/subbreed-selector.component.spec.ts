import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SubbreedSelectorComponent } from './subbreed-selector.component';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SubbreedSelectorComponent', () => {
  let component: SubbreedSelectorComponent;
  let fixture: ComponentFixture<SubbreedSelectorComponent>;

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

  const mockActivatedRoute = {
    snapshot: {
      queryParams: {
        breed: 'bulldog',
        subbreed: 'english',
      },
    },
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubbreedSelectorComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubbreedSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize component with breed and subbreed from query parameters', fakeAsync(() => {
    fixture.detectChanges(); // Triggers ngOnInit
    tick(); // Simulate the passage of time until all asynchronous activities finish

    expect(component.selectedBreed).toEqual('bulldog');
    expect(component.selectedSubbreed).toEqual('english');
  }));
  // Breed list is loaded successfully from the API
  it('should initialize component with breed and subbreed from query parameters', fakeAsync(() => {
    fixture.detectChanges(); // Triggers ngOnInit
    tick(); // Simulate the passage of time until all asynchronous activities finish

    expect(component.selectedBreed).toEqual('bulldog');
    expect(component.selectedSubbreed).toEqual('english');
  }));
  // Subbreed selection change emits selected breed and subbreed
  it('should emit selected breed and subbreed when subbreed selection changes', function () {
    const fixture = TestBed.createComponent(SubbreedSelectorComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    let emittedValue;
    component.selectedChange.subscribe((value) => {
      emittedValue = value;
    });

    component.selectedSubbreed = 'french';
    component.onSubbreedSelectionChange();

    expect(emittedValue).toEqual({
      breed: 'bulldog',
      subbreed: 'french',
    } as any);

    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      relativeTo: mockActivatedRoute,
      queryParams: {
        breed: 'bulldog',
        subbreed: 'french',
      },
      queryParamsHandling: 'merge',
    });
  });

  // API returns an error while loading breeds
  it('should handle error when loading breeds', fakeAsync(() => {
    TestBed.resetTestingModule();
    // Arrange
    const apiServiceMock = {
      getAllBreeds: jasmine
        .createSpy()
        .and.returnValue(throwError('Some error while loading breeds')),
      // ... other methods ...
    };

    const mockActivatedRoute = {
      snapshot: {
        queryParams: {},
      },
    };

    const mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [SubbreedSelectorComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubbreedSelectorComponent);
    component = fixture.componentInstance;

    // Act
    fixture.detectChanges(); // Triggers ngOnInit
    tick(); // Simulate the passage of time until all asynchronous activities finish

    // Assert
    expect(component.selectedBreed).toEqual('');
    expect(component.selectedSubbreed).toEqual('');
  }));
});
