import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmountInputComponent } from '../amount-input/amount-input.component';
import { MasonryImagesComponent } from '../ui/masonry-images/masonry-images.component';

@Component({
  selector: 'app-random-image',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmountInputComponent,
    MasonryImagesComponent,
  ],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.css',
})
export class RandomImageComponent implements OnInit {
  imageUrls: string[] = [];
  isImageLoading: boolean = false;
  count: number = 1;
  hasError: boolean = false;

  private dogApiService = inject(ApiService);

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    if (this.hasError) return;

    this.isImageLoading = true;
    this.dogApiService.getRandomImage(this.count).subscribe({
      next: (image) => {
        this.imageUrls = image.message;
      },
      error: (e) => {
        console.error('Something wrong getting random images', e);
      },
      complete: () => {
        this.isImageLoading = false;
      },
    });
  }

  onRandomAmountChange(count: number) {
    this.count = count;
    this.loadImages();
  }
}
