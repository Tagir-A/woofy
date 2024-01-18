import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-amount-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './amount-input.component.html',
  styleUrl: './amount-input.component.css',
})
export class AmountInputComponent {
  count: number = 1;
  hasError: boolean = false;

  @Output() amountChange = new EventEmitter<number>();

  ngOnInit(): void {}

  onChange() {
    this.validateInput();
    if (!this.hasError) {
      this.amountChange.emit(this.count);
    }
  }

  validateInput() {
    if (this.count < 1 || this.count > 50) {
      this.hasError = true;
    } else {
      this.hasError = false;
    }
  }
}
