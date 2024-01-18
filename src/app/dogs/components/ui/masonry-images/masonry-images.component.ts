import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-masonry-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './masonry-images.component.html',
  styleUrl: './masonry-images.component.css',
})
export class MasonryImagesComponent {
  @Input() imageUrls: string[] = [];
}
