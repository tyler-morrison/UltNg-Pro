import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[credit-card]'
})
export class CreditCardDirective {

  @HostBinding('style.border') border: string;

  @HostListener('input', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Cast event target into the type of HTMLInputElement
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, "");

    // Ensure that the input value never exceeds 16 digits
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0,16)
    }

    let numbers = [];

    // Loop through the trimmed string and add a space between every set of 4 numbers
    for (let i = 0; i < trimmed.length; i+=4 ) {
      numbers.push(trimmed.substr(i, 4));
      // RESULT: ['1234', '5678', '9012', '3456']
    }

    // Finally, reassign the value back to input...
    input.value = numbers.join(' ');

    // BEGIN BORDER CHANGER
    // First we instantiate the border property as blank by default
    this.border = '';

    // Next we use the `test` method to RegEx if the input is a letter or number
    if(/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
    }
  }
}
