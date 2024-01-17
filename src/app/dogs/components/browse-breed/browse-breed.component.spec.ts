import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBreedComponent } from './browse-breed.component';

describe('BrowseBreedComponent', () => {
  let component: BrowseBreedComponent;
  let fixture: ComponentFixture<BrowseBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseBreedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
