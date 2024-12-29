import { AUTHENTICATE } from '@/frontend/type-it-up-graphql';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'lib-callback',
  standalone: true,
  template: `
    <div>
      <p>Authenticating...</p>
    </div>
  `,
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.apollo
        .mutate({
          mutation: AUTHENTICATE,
          variables: { code },
        })
        .subscribe({
          next: (result) => {
            if (!result.data?.authenticate) {
              this.router.navigate(['/login']);
              return;
            }
            const token = result.data?.authenticate;
            localStorage.setItem('authToken', token);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Authentication failed', error);
          },
        });
    }
  }
}
