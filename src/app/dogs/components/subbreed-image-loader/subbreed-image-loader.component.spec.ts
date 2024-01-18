import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubbreedImageLoaderComponent } from './subbreed-image-loader.component';

describe('SubbreedImageLoaderComponent', () => {
  let component: SubbreedImageLoaderComponent;
  let fixture: ComponentFixture<SubbreedImageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubbreedImageLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubbreedImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
