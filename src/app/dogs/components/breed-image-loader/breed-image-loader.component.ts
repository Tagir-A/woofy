import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MasonryImagesComponent } from '../ui/masonry-images/masonry-images.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-breed-image-loader',
  standalone: true,
  imports: [MasonryImagesComponent, CommonModule],
  templateUrl: './breed-image-loader.component.html',
  styleUrl: './breed-image-loader.component.css',
})
export class BreedImageLoaderComponent implements OnChanges {
  @Input() payload!: string | null;
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
          this.dogApiService.getAllBreedImages(this.payload).subscribe({
            next: (response) => {
              this.images = response.message;
            },
            error(err) {
              console.error(
                'Something wrong while loading images for breeds',
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
            .getRandomBreedImages(this.payload, this.count)
            .subscribe({
              next: (response) => {
                this.images = response.message;
              },
              error(err) {
                console.error(
                  'Something wrong while loading images for breeds',
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
