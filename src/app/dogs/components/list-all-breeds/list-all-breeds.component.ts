import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ApiResponse } from '../../types/api-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-all-breeds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-all-breeds.component.html',
  styleUrl: './list-all-breeds.component.css',
})
export class ListAllBreedsComponent implements OnInit {
  allBreeds: ApiResponse['message'] = {};

  private dogApiService = inject(ApiService);

  ngOnInit(): void {
    this.dogApiService.getAllBreeds().subscribe({
      next: (response) => {
        this.allBreeds = response.message;
      },
      error(err) {
        console.error('Some error: ', err);
      },
    });
  }
}
