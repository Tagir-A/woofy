import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ApiResponse } from '../../types/api-response';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-all-breeds',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './list-all-breeds.component.html',
  styleUrl: './list-all-breeds.component.css',
})
export class ListAllBreedsComponent implements OnInit {
  allBreeds: ApiResponse['message'] = {};
  filterText: string = '';

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

  hasSubBreeds(breedData?: string[]): boolean {
    return Array.isArray(breedData) && breedData.length > 0;
  }

  get filteredBreeds() {
    if (!this.filterText) {
      return this.allBreeds;
    }
    const normalized = this.filterText.toLowerCase();
    return Object.keys(this.allBreeds)
      .filter(
        (key) =>
          // breed starts with the input text
          key.toLowerCase().startsWith(normalized) ||
          // or any of subbreeds
          this.allBreeds[key].some((subbreed) =>
            subbreed.toLowerCase().startsWith(normalized)
          )
      )
      .reduce<ApiResponse['message']>((filtered, key) => {
        filtered[key] = this.allBreeds[key];
        return filtered;
      }, {});
  }
}
