import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../type-it-up-navbar/navbar/navbar.component';
import { AuthService } from '@/frontend/type-it-up-auth';

@Component({
  selector: 'lib-type-it-up-home-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './home-layout.component.html',
})
export class TypeItUpHomeLayoutComponent {
  user$: typeof AuthService.prototype.user$;
  constructor(public auth: AuthService) {
    this.user$ = auth.user$;
  }
}
