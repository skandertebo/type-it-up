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
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.apollo
        .mutate({
          mutation: LOGIN,
          variables: { email, password },
        })
        .subscribe({
          next: () => {
            this.errorMessage = null;
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error logging in:', error);
            this.errorMessage = 'Invalid email or password. Please try again.'; 
          },
        });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      console.log('Form is invalid');
    }
  }
}
