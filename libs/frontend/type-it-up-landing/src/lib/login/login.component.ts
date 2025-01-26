import { SVGDisplayComponent } from '@/frontend/shared';
import { LOGIN } from '@/frontend/type-it-up-graphql';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [SVGDisplayComponent, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login Data:', { email, password });

      this.apollo
        .mutate({
          mutation: LOGIN,
          variables: { email, password },
        })
        .subscribe({
          next: (result) => {
            console.log('Login Successful:', result);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error logging in:', error);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
