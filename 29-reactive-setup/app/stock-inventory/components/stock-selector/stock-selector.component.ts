import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Product} from "../../models/product.interface";

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div
      class="stockSelector"
      [formGroup]="parent"
    >
      <div
        formGroupName="selector"
      >
        <select formControlName="product_id">
          <option value="">Select stock</option>
          <option
            *ngFor="let product of products"
            [value]="product.id"
          >
           {{ product.name }} 
          </option>
        </select>
        <!-- REPLACED W/ STOCK-COUNTER BELOW
        <input
          class="stockSelector-counter"
          type="number"
          step="10"
          min="10"
          max="1000"
          formControlName="quantity"
        > -->
        <stock-counter
          [step]="10"
          [min]="10"
          [max]="1000"
          formControlName="quantity"
        ></stock-counter>
        <button
          type="button"
          (click)="onAdd()"
          [disabled]="stockExists || notSelected"
        >
          Add Stock
        </button>
        <div
          class="stockSelector-hasError"
          *ngIf="stockExists"
        >
          Item already exists in the stock
        </div>
      </div>
    </div>
  `
})

export class StockSelectorComponent {
  @Input() parent: FormGroup;

  @Input() products: Array<Product>;

  @Output() added = new EventEmitter<any>();

  get notSelected() {
    return (
      !this.parent.get('selector.product_id').value
    );
  }

  get stockExists() {
    return (
      this.parent.hasError('stockExists') &&
        this.parent.get('selector.product_id').dirty
    );
  }

  onAdd() {
    this.added.emit(this.parent.get('selector').value);

    // RESET METHOD
    // `reset()` requires us to specify each value
    // `reset()` also updates the form classes like 'touched' or 'dirty'
    this.parent.get('selector').reset({
      product_id: '',
      quantity: 10
    });

    // PATCHVALUE METHOD
    // ...however, `patchValue()` allows us to selectively update...
    //
    // this.parent.get('selector').patchValue({
    //   product_id: ''
    // });

    // SETVALUE METHOD
    // Like `reset()` this method requires us to specify values for all properties
    //
    // this.parent.get('selector').setValue({
    //   product_id: '',
    //   quantity: 10
    // });
  }
}
