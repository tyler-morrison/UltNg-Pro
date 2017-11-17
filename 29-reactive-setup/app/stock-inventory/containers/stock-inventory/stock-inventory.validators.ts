import {AbstractControl} from "@angular/forms";

export class StockValidators {
  static checkBranch(control: AbstractControl) {
    // Create a made-up RegEx to test if a branch begins w/ a letter and ends with 3 numbers
    const REGEXP = /^[a-z]\d{3}$/i;

    const VALID = REGEXP.test(control.value);

    return VALID ? null : { invalidBranch: true };
  }

  static checkStockExists(control: AbstractControl) {
    const STOCK_ITEM = control.get('stock');
    const SELECTOR = control.get('selector');

    // First, we want to do a safety check to ensure the selectors above exists
    if(!(STOCK_ITEM && SELECTOR)) return null;

    // Then iterate over current products in array to check if selected Id already exists
    const EXISTS = STOCK_ITEM.value.some((stock) => {
      return stock.product_id === parseInt(SELECTOR.value.product_id);
    });

    return EXISTS ? { stockExists: true } : null;
  }
}
