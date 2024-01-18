import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { ApiService } from './dogs/service/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NavbarComponent } from './navbar/navbar.component';
import { BreedFilterService } from './dogs/service/breed-filter.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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

  const filterServiceMock = {
    filterText: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NavbarComponent,
        RouterTestingModule,
        LazyLoadImageModule,
      ],

      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: BreedFilterService, useValue: filterServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'woofy' title`, () => {
    expect(component.title).toEqual('woofy');
  });
});
