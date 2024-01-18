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

  it('should have an empty filterText property by default', () => {
    expect(service.filterText).toEqual('');
  });

  it('should be able to set the filterText property', () => {
    service.filterText = 'Labrador';
    expect(service.filterText).toEqual('Labrador');
  });
});
