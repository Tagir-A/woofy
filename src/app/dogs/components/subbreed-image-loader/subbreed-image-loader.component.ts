import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MasonryImagesComponent } from '../ui/masonry-images/masonry-images.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subbreed-image-loader',
  standalone: true,
  imports: [MasonryImagesComponent, CommonModule],
  templateUrl: './subbreed-image-loader.component.html',
  styleUrl: './subbreed-image-loader.component.css',
})
export class SubbreedImageLoaderComponent implements OnChanges {
  @Input() payload!: { breed: string; subbreed: string } | null;
  @Input() mode!: { type: 'all' } | { type: 'random' };
  @Input() count: number = 1;

  isLoadingImages: boolean = false;
  images: string[] = [];

  private dogApiService = inject(ApiService);

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['payload'] || changes['mode'] || changes['count']) &&
      this.payload
    ) {
      this.isLoadingImages = true;
      switch (this.mode.type) {
        case 'all':
          this.dogApiService
            .getAllSubbreedImages(this.payload.breed, this.payload.subbreed)
            .subscribe({
              next: (response) => {
                this.images = response.message;
              },
              error(err) {
                console.error(
                  'Something wrong while loading images for subbreeds',
                  err
                );
              },
              complete: () => {
                this.isLoadingImages = false;
              },
            });
          break;
        case 'random':
          this.dogApiService
            .getRandomSubbreedImages(
              this.payload.breed,
              this.payload.subbreed,
              this.count
            )
            .subscribe({
              next: (response) => {
                this.images = response.message;
              },
              error(err) {
                console.error(
                  'Something wrong while loading images for subbreeds',
                  err
                );
              },
              complete: () => {
                this.isLoadingImages = false;
              },
            });
          break;

        default:
          throw new Error('Impossible state');
      }
    }
  }
}
