import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip'
})
export class TooltipDirective implements OnInit {
  tooltipElement: HTMLElement = document.createElement('div');

  @Input() set tooltip(value: string) {
    this.tooltipElement.textContent = value;
  }

  hide() {
    this.tooltipElement.classList.remove('tooltip--isActive');
  }

  show() {
    console.log(this.tooltipElement);
    this.tooltipElement.classList.add('tooltip--isActive');
  }


  constructor(
    private tooltipContainer: ElementRef,
  ) {}

  ngOnInit() {
    this.tooltipElement.className = 'tooltip';
    this.tooltipContainer.nativeElement.appendChild(this.tooltipElement);
    this.tooltipContainer.nativeElement.classList.add('tooltip-container');
  }
}
