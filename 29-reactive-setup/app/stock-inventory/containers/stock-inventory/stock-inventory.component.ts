import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, AbstractControl} from "@angular/forms";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

import { StockInventoryService } from "../../services/stock-inventory.service";

import { Item, Product } from "../../models/product.interface";
import {StockValidators} from "./stock-inventory.validators";

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stockInventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        
        <stock-branch
          [parent]="form"
        ></stock-branch>
        
        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)"
        ></stock-selector>
        
        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)"
        ></stock-products>
        
        <div class="stockInventory-price">
          Total: {{ total | currency: 'USD': true }}
        </div>
        
        <div class="stockInventory-buttons">
          <button
            type="submit"
            [disabled]="form.invalid"
          >
            Order Stock
          </button>
        </div>
      </form>
    </div>
    
    <pre>{{ form.value | json }}</pre>
  `
})
export class StockInventoryComponent implements OnInit {

  products: Array<Product>;

  productMap: Map<number, Product>;

  total: number;

  form = this.fb.group({
    store: this.fb.group({
      branch: [
        '',
        [Validators.required, StockValidators.checkBranch],
        [this.validateBranch.bind(this)]
      ],
      code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  }, { validator: StockValidators.checkStockExists });

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  ngOnInit() {
    const cart: Observable<Item[]> = this.stockService.getCartItems();
    const products: Observable<Product[]> = this.stockService.getProducts();

    Observable
      .forkJoin(cart, products)
      .subscribe(([cart, products]) => {

        const myMap = products
          .map<[number, Product]>(product => [product.id, product]);

        this.productMap = new Map<number, Product>(myMap);
        this.products = products;

        // Push each item from server into our FormArray
        cart.forEach(item => this.addStock(item));

        // Initialize first total value before changes occur...
        this.calculateTotal(this.form.get('stock').value);

        this.form.get('stock')
          .valueChanges
          .subscribe(value => this.calculateTotal(value));
      });
  }

  validateBranch(control: AbstractControl) {
    return this.stockService
      .checkBranchId(control.value)
      .map((response: boolean) => response ? null : { unknownBranch: true });
  }

  calculateTotal(value: Item[]) {
    const totalPrice = value.reduce((prev, next) =>{
      const nextPrice = this.productMap.get(next.product_id).price;
      return prev + (next.quantity * nextPrice);
    }, 0);

    this.total = totalPrice;
  }

  createStock(stock){
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    })
  }

  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({group, index}: {group: FormGroup, index: number}) {
    const control = this.form.get('stock') as FormArray;

    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit: ', this.form.value);
  }

}
