import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubbreedSelectorComponent } from './subbreed-selector.component';

describe('SubbreedSelectorComponent', () => {
  let component: SubbreedSelectorComponent;
  let fixture: ComponentFixture<SubbreedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubbreedSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubbreedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
