import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-by-breed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './by-breed.component.html',
  styleUrl: './by-breed.component.css',
})
export class ByBreedComponent implements OnInit {
  breedOptions: string[] = [];
  selectedBreed: string = '';
  selectedBreed$: Subject<string> = new Subject<string>();
  isBreedListLoading: boolean = false;
  imageUrl: string[] = [];
  isImageLoading: boolean = false;

  private route = inject(ActivatedRoute);
  private dogApiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this.selectedBreed$.subscribe({
      next: (value) => {
        this.selectedBreed = value;
        this.loadImage(value);
        // Update the query parameter
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { breed: this.selectedBreed },
          queryParamsHandling: 'merge',
        });
      },
    });

    this.isBreedListLoading = true;
    this.dogApiService.getAllBreeds().subscribe({
      next: (response) => {
        this.breedOptions = Object.keys(response.message);
        const queryParams = this.route.snapshot.queryParams;
        const breed = queryParams['breed'];
        this.selectedBreed$.next(breed ?? this.breedOptions[0]); // We assume the response was correct. In prod, we would use a more robust check
      },
      error(err) {
        console.error('Some error: ', err);
      },
      complete: () => {
        this.isBreedListLoading = false;
      },
    });
  }

  onSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedBreed$.next(selectedValue);
  }

  loadImage(value: string) {
    this.isImageLoading = true;
    this.dogApiService.getRandomBreedImage(value).subscribe({
      next: (response) => {
        this.imageUrl = response.message;
      },
      error: (err) => {
        console.error('Some error with image: ', err);
      },
      complete: () => {
        this.isImageLoading = false;
      },
    });
  }
}
