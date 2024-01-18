import { TestBed } from '@angular/core/testing';

import { BreedFilterService } from './breed-filter.service';

describe('BreedFilterService', () => {
  let service: BreedFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
