import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all breeds', () => {
    service.getAllBreeds().subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.message).toBeDefined();
      expect(Object.keys(response.message).length).toBeGreaterThan(0);
    });
    const req = httpController.expectOne('https://dog.ceo/api/breeds/list/all');
    expect(req.request.method).toBe('GET');
  });

  it('should retrieve a random breed image', () => {
    const breed = 'hound';
    service.getRandomBreedImage(breed).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.message).toBeDefined();
    });
    const req = httpController.expectOne(
      'https://dog.ceo/api/breed/hound/images/random/1'
    );
    expect(req.request.method).toBe('GET');
  });
  it('should retrieve all subbreed images', () => {
    const breed = 'hound';
    const subbreed = 'afghan';
    service.getAllSubbreedImages(breed, subbreed).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.message).toBeDefined();
      expect(response.message.length).toBeGreaterThan(0);
    });
    const req = httpController.expectOne(
      'https://dog.ceo/api/breed/hound/afghan/images'
    );
    expect(req.request.method).toBe('GET');
  });
});
