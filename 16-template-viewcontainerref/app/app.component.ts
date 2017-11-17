import { Component, TemplateRef, ViewContainerRef, ViewChild, AfterContentInit } from '@angular/core';



@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- Passing Template Context -->
      <div class="dynamicPlaceholder" #entry></div>
      <template #tmpl let-name let-location="location">
        {{ name }} : {{ location }}
      </template>
      
      <!-- Basic ngTemplateOutlet -->
      <div class="templateOutlet">
        <ng-container [ngTemplateOutlet]="outlet"></ng-container>
      </div>
      <template #outlet>
        New template
      </template>
      
      <!-- ngTemplateOutlet w/ Context-->
      <div class="templateOutlet--context">
        <ng-container
          [ngTemplateOutlet]="tmpl"
          [ngTemplateOutletContext]="ctx"
        ></ng-container>
      </div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;

  // When using ngTemplateOutlet w/ context, we must create a context object.
  ctx = {
    $implicit: "Testy McTester",
    location: "Main Street, US"
  };

  ngAfterContentInit() {
    // Instantiates the template
    this.entry.createEmbeddedView( this.tmpl, {
      $implicit: "Tyler Morrison",
      location: "Charlotte, NC"
    });
  }

}
