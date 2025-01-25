import { SVGDisplayComponent } from '@/frontend/shared';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [SVGDisplayComponent, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login Data:', { email, password });

      alert('Login Successful!');
    } else {
      console.log('Form is invalid');
    }
  }
}
