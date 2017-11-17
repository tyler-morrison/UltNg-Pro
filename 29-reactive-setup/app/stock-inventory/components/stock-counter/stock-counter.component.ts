import {Component, ExistingProvider, forwardRef, Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const COUNTER_CONTROL_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  // Allows us to hoist StockCounterComponent after it is ready
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  providers: [
    COUNTER_CONTROL_ACCESSOR
  ],
  selector: 'stock-counter',
  styleUrls: ['stock-counter.component.scss'],
  template: `
    <div
      class="stockCounter"
      [class.stockCounter-isFocused]="focus"
    >
      <div>
        <div
          tabindex="1"
          (keydown)="onKeydown($event)"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
        >
          <p>{{ value }}</p>
          
          <div>
            <button
              type="button"
              (click)="increment()"
              [disabled]="value === max"
            >
              +
            </button>
            <button
              type="button"
              (click)="decrement()"
              [disabled]="value === min"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})

export class StockCounterComponent implements ControlValueAccessor {

  private onTouch: Function;
  private onModelChange: Function;

  // Methods required for ControlValueAccessor

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.value = value || 0;
  }

  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;

  value: number = 10;

  focus: boolean;

  onKeydown(event: KeyboardEvent) {
    const handlers = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment()
    }

    if (handlers[event.code]) {
      // Dynamically call increment or decrement based on event.code
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }

    // If key event is neither ArrowDown nor ArrowUp, simply call onTouch()
    this.onTouch();
  }

  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  increment() {
    if (this.value < this.max ) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }

    this.onTouch();
  }

  decrement() {
    if (this.value > this.min ) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }

    this.onTouch();
  }
}
