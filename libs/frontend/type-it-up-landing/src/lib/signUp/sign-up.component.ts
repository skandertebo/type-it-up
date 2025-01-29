import { ButtonComponent } from '@/frontend/shared';
import { AuthService } from '@/frontend/type-it-up-auth';
import { CHECK_USERNAME_EXISTS } from '@/frontend/type-it-up-graphql';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { catchError, debounceTime, map, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnDestroy {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            this.noWhitespaceValidator(),
          ],
          [this.usernameExistsValidator()],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(255)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(32),
            this.createPasswordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [this.passwordMatchValidator],
        updateOn: 'blur',
      }
    );
    this.signupForm
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.signupForm?.get('confirmPassword')?.updateValueAndValidity();
      });
  }

  // Custom validators
  private createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const passwordValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  private noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasWhitespace = /\s/.test(control.value);
      return hasWhitespace ? { whitespace: true } : null;
    };
  }

  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const username = control.value.trim();

      if (!username) return of(null);

      return this.apollo
        .query({
          query: CHECK_USERNAME_EXISTS,
          variables: { username },
          fetchPolicy: 'no-cache',
        })
        .pipe(
          debounceTime(300),
          map((response) =>
            response.data.checkUsernameExists ? { usernameTaken: true } : null
          ),
          catchError(() => of(null))
        );
    };
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  getPasswordStrength(): { strength: number; text: string } {
    const password = this.signupForm.get('password')?.value;
    if (!password) return { strength: 0, text: 'Very Weak' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthMap = {
      0: 'Very Weak',
      1: 'Weak',
      2: 'Fair',
      3: 'Good',
      4: 'Strong',
      5: 'Very Strong',
    };

    return {
      strength,
      text: strengthMap[strength as keyof typeof strengthMap],
    };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const { email, password, firstName, lastName, username } = formData;

      this.authService
        .handleSignup(email, password, firstName, lastName, username)
        .subscribe({
          next: () => {
            this.errorMessage = null;
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.errorMessage = error.message;
          },
        });
    } else {
      this.errorMessage = 'Please fix validation erros first and try again';

      // to display validation errors for untouched fields when a user submits a form.
      this.markFormGroupTouchedAndDirty(this.signupForm);
    }
  }

  private markFormGroupTouchedAndDirty(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
