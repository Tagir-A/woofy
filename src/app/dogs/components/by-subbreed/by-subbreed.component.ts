import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubbreedSelectorComponent } from '../subbreed-selector/subbreed-selector.component';
import { SubbreedImageLoaderComponent } from '../subbreed-image-loader/subbreed-image-loader.component';
import { AmountInputComponent } from '../amount-input/amount-input.component';

@Component({
  selector: 'app-by-subbreed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SubbreedSelectorComponent,
    SubbreedImageLoaderComponent,
    AmountInputComponent,
  ],
  templateUrl: './by-subbreed.component.html',
  styleUrl: './by-subbreed.component.css',
})
export class BySubbreedComponent implements OnInit {
  state: { type: 'all' } | { type: 'random' } = { type: 'random' };
  payload: { breed: string; subbreed: string } | null = null;
  count: number = 1;

  ngOnInit(): void {}

  onSubbreedChange(newPayload: { breed: string; subbreed: string }) {
    this.payload = newPayload;
  }
  updateStateType(newType: 'all' | 'random') {
    this.state = { type: newType };
  }
  onRandomAmountChange(count: number) {
    this.count = count;
  }
}
