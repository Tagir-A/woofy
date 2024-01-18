import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedImageLoaderComponent } from './breed-image-loader.component';

describe('BreedImageLoaderComponent', () => {
  let component: BreedImageLoaderComponent;
  let fixture: ComponentFixture<BreedImageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedImageLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
