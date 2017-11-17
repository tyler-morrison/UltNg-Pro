import { Component } from '@angular/core';

@Component({
  selector: 'auth-message',
  template: `
    <div class="authForm-message">
      You will be logged in for {{ loginDuration }} days
    </div>
  `
})

export class AuthMessageComponent {
  loginDuration: number = 7
}
