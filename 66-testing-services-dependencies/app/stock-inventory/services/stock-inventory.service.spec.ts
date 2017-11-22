import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import {Http, Response, ResponseOptions} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { StockInventoryService } from "./stock-inventory.service";
import {Item, Product} from "../models/product.interface";

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

const createResponse = (body) => {
  return Observable.of(
    new Response( new ResponseOptions({ body: JSON.stringify(body) }))
  );
};

const cartItems: Item[] = [
  { product_id: 1, quantity: 10 },
  { product_id: 2, quantity: 5 }
];

const productItems: Product[] = [
  { id: 1, price: 10, name: 'Test' },
  { id: 2, price: 100, name: 'Another' }
];

class MockHttp {
  get() {
    return createResponse([]);
  }
}

describe('StockInventoryService', () => {

  let service: StockInventoryService;
  let http: Http;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        StockInventoryService,
        { provide: Http, useClass: MockHttp }
      ]
    });

    http = bed.get(Http);
    service = bed.get(StockInventoryService);
  });

  it('should get cart items', () => {
    spyOn(http, 'get').and.returnValue(createResponse([...cartItems]));

    service.getCartItems()
      .subscribe((result) => {
        expect(result.length).toBe(2);
        expect(result).toEqual(cartItems);
      });
  });

  it('should get product items', () => {
    spyOn(http, 'get').and.returnValue(createResponse([...productItems]));

    service.getProducts()
      .subscribe((result) => {
        expect(result.length).toBe(2);
        expect(result).toEqual(productItems);
      });
  });

});
