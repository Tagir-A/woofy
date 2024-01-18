import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ApiResponse } from '../../types/api-response';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subbreed-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subbreed-selector.component.html',
  styleUrl: './subbreed-selector.component.css',
})
export class SubbreedSelectorComponent implements OnInit {
  isBreedListLoading: boolean = false;
  allBreeds: ApiResponse['message'] = {};
  breedsWithSubbreeds: string[] = [];
  selectedBreed: string = '';
  selectedBreedSubbreeds: string[] = [];
  selectedSubbreed: string = '';

  @Output() selectedChange = new EventEmitter<{
    breed: string;
    subbreed: string;
  }>();

  private dogApiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.isBreedListLoading = true;
    this.dogApiService.getAllBreeds().subscribe({
      next: (response) => {
        this.allBreeds = response.message;
        this.breedsWithSubbreeds = Object.entries(this.allBreeds)
          .filter(([_, subbreeds]) => subbreeds.length > 0)
          .map(([breed]) => breed);

        // Get query parameters and set default values
        const params = this.route.snapshot.queryParams;
        const breedParam = params['breed'];
        const subbreedParam = params['subbreed'];
        const defaultBreed = breedParam ?? this.breedsWithSubbreeds[0];
        this.selectedBreed = defaultBreed;
        this.selectedBreedSubbreeds = this.allBreeds[this.selectedBreed];
        const defaultSubbreed = subbreedParam ?? this.selectedBreedSubbreeds[0];

        this.selectedSubbreed = defaultSubbreed;
        this.onSubbreedSelectionChange();
      },
      error(err) {
        console.error('Some error while loading breeds', err);
      },
      complete: () => {
        this.isBreedListLoading = false;
      },
    });
  }

  onSelectionChange() {
    this.selectedBreedSubbreeds = this.allBreeds[this.selectedBreed];
    this.selectedSubbreed = this.selectedBreedSubbreeds[0];
    this.onSubbreedSelectionChange();
  }
  onSubbreedSelectionChange() {
    this.selectedChange.emit({
      breed: this.selectedBreed,
      subbreed: this.selectedSubbreed,
    });
    // Update the query parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        breed: this.selectedBreed,
        subbreed: this.selectedSubbreed,
      },
      queryParamsHandling: 'merge',
    });
  }
}
