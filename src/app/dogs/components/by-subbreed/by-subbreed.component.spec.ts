import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySubbreedComponent } from './by-subbreed.component';

describe('BySubbreedComponent', () => {
  let component: BySubbreedComponent;
  let fixture: ComponentFixture<BySubbreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BySubbreedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BySubbreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
