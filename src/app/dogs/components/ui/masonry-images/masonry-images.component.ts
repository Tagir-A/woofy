import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-masonry-images',
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule],
  templateUrl: './masonry-images.component.html',
  styleUrl: './masonry-images.component.css',
})
export class MasonryImagesComponent {
  defaultImage = 'https://placehold.co/400';
  @Input() imageUrls: string[] = [];
}
