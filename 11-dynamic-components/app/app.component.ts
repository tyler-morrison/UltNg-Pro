import {
  Component, ViewContainerRef, ViewChild, AfterContentInit, ComponentFactoryResolver,
  ComponentRef, TemplateRef
} from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <button
      type="button"
      (click)="destroyComponents()"
    >
      DESTRUCT-O-MATIC
    </button>
    <button
      type="button"
      (click)="moveComponents()"
    >
      Shuffle
    </button>
    <div>
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  component: ComponentRef<AuthFormComponent>;

  @ViewChild("entry", { read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterContentInit(){
    // This function resolves the dynamic component by creating a factory...
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);

    // This creates the new component...
    this.entry.createComponent(authFormFactory);
    this.component = this.entry.createComponent(authFormFactory, 0);

    this.component.instance.title = "Create Account";

    this.component.instance.submitted
      .subscribe(this.loginUser);
  }

  loginUser(user: User) {
    console.log('LOGIN: ', user)
  }

  destroyComponents() {
    this.component.destroy();
  }

  moveComponents() {
    this.entry.move(this.component.hostView, 1);
  }
}
