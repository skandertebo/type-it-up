import { ButtonComponent, SVGDisplayComponent } from '@/frontend/shared';
import { AuthService } from '@/frontend/type-it-up-auth';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [SVGDisplayComponent, ReactiveFormsModule, ButtonComponent],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  destroy$ = new Subject<void>();
  loading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.handleLogin(email, password).subscribe({
        next: () => {
          this.errorMessage = null;
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error logging in:', error);
          this.loading = false;
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
