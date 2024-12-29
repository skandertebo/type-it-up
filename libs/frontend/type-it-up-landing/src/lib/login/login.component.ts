import { Component } from '@angular/core';

@Component({
  selector: 'lib-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login() {
    window.location.href =
      'https://intimate-kaleidoscope-33-staging.authkit.app/';
  }
}
