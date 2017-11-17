import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';

import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';

import {StockBranchComponent} from "./components/stock-branch/stock-branch.component";
import {StockProductsComponent} from "./components/stock-products/stock-products.component";
import {StockSelectorComponent} from "./components/stock-selector/stock-selector.component";
import {StockInventoryService} from "./services/stock-inventory.service";
import {StockCounterComponent} from "./components/stock-counter/stock-counter.component";

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockCounterComponent,
    StockProductsComponent,
    StockSelectorComponent
  ],
  providers: [
    StockInventoryService
  ],
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule {}
