import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/api-response';
import { ImageListResponse, ImageResponse } from '../types/image-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URL = 'https://dog.ceo/api';

  constructor(private http: HttpClient) {}

  getAllBreeds(): Observable<ApiResponse> {
    const url = `${this.URL}/breeds/list/all`;
    const headers = {
      'x-cacheable': 'true',
    };
    return this.http.get<ApiResponse>(url, { headers });
  }

  getRandomBreedImage(
    breed: string,
    count: number = 1
  ): Observable<ImageListResponse> {
    const url = `${this.URL}/breed/${breed}/images/random/${count}`;
    return this.http.get<ImageListResponse>(url);
  }

  getRandomImage(count: number = 1): Observable<ImageListResponse> {
    const url = `${this.URL}/breeds/image/random/${count}`;
    return this.http.get<ImageListResponse>(url);
  }
}
