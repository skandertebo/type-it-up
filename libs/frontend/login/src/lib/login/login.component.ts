import { GET_SSO_URL } from '@/frontend/type-it-up-graphql';
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
    this.apollo
      .query({
        query: GET_SSO_URL,
        variables: { organizationId: this.orgId },
      })
      .subscribe((result) => {
        const ssoUrl = result.data.getSSOUrl;
        window.location.href = ssoUrl; // Redirect to SSO URL
      });
  }
}
