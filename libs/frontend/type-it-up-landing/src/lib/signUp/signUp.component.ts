import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  Observable,
  map,
  debounceTime,
  switchMap,
  first,
  Subject,
  takeUntil,
} from 'rxjs';
// import { SignupService } from './signup.service';

@Component({
  selector: 'lib-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnDestroy {
  signupForm: FormGroup;
  private destroy$ = new Subject<void>();
  showPassword = false;
  showConfirmPassword = false;

  private readonly USERNAME_PATTERN = /^[a-zA-Z0-9_-]*$/;
  private readonly PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  private readonly NAME_PATTERN = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  // private signupService: SignupService
  constructor(private fb: FormBuilder, ) {
    this.signupForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(this.NAME_PATTERN),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(this.NAME_PATTERN),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(this.USERNAME_PATTERN),
            this.noWhitespaceValidator(),
          ],
          // [this.usernameExistsValidator()],
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
            Validators.pattern(this.PASSWORD_PATTERN),
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

  // private usernameExistsValidator() {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return control.valueChanges.pipe(
  //       debounceTime(500),
  //       switchMap((username) =>
  //         this.signupService.checkUsernameExists(username).pipe(
  //           map((exists) => (exists ? { usernameExists: true } : null)),
  //           first()
  //         )
  //       )
  //     );
  //   };
  // }

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
      console.log('Signup Data:', formData);
      alert('Signup Successful!');
    } else {
      console.log('Form is invalid');
        // to display validation errors for untouched fields when a user submits a form.
      this.markFormGroupTouched(this.signupForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
