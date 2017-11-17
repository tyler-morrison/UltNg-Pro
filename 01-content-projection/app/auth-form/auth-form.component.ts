import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  Component,
  EventEmitter,
  Output,
  ViewChild, ViewChildren, QueryList, ChangeDetectorRef, ElementRef, Renderer
} from '@angular/core';

import { AuthRememberComponent } from "./auth-remember.component";
import { AuthMessageComponent } from "./auth-message.component";

import { User } from './aut-form.interface';

@Component({
  selector: 'auth-form',
  styles: [`
    .email { border-color: #9f72e6}
  `],
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message [style.display]="showMessage ? 'inherit' : 'none'"></auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;

  @ViewChild('email') email: ElementRef;

  @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

  showMessage: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer
  ) {}

  ngAfterContentInit() {
    if (this.message) {
      this.message.loginDuration = 30;
    }
    if (this.remember) {
      this.remember.checked
          .subscribe((checked: boolean) => this.showMessage = checked);
    }
  }

  ngAfterViewInit() {
    // nativeElement access is fine for web only applications...
    //
    // this.email.nativeElement.setAttribute("placeholder", "Enter your email address");
    // this.email.nativeElement.classList.add("email");
    // this.email.nativeElement.focus();

    // Using the Renderer API is a more platform agnostic method...
    this.renderer.setElementAttribute(this.email.nativeElement, "placeholder", "Enter your email address");
    this.renderer.setElementClass(this.email.nativeElement, "email", true);
    this.renderer.invokeElementMethod(this.email.nativeElement, "focus");

    if (this.message) {
      this.message.loginDuration = 30;
    }

    this.cd.detectChanges();
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
