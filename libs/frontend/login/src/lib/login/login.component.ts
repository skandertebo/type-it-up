import { Component, Inject } from '@angular/core';
import { ORG_ID_TOKEN } from '@type-it-up/shared';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'lib-login',
  standalone: true,
  template: `
    <div>
      <button (click)="login()">Login with SSO</button>
    </div>
  `,
})
export class LoginComponent {
  constructor(
    private apollo: Apollo,
    @Inject(ORG_ID_TOKEN) private orgId: string
  ) {}

  login() {
    window.location.href =
      'https://intimate-kaleidoscope-33-staging.authkit.app/';
  }
}
