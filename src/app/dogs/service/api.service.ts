import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/api-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URL = 'https://dog.ceo/api';

  constructor(private http: HttpClient) {}

  getAllBreeds(): Observable<ApiResponse> {
    const url = `${this.URL}/breeds/list/all`;
    return this.http.get<ApiResponse>(url);
  }
}
