import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'lib-type-it-up-landing',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './type-it-up-landing.component.html',
  styleUrl: './type-it-up-landing.component.css',
})
export class TypeItUpLandingComponent {}
