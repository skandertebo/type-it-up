import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../type-it-up-navbar/navbar/navbar.component';
import { AuthService } from '@/frontend/type-it-up-auth';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'lib-type-it-up-home-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './home-layout.component.html',
})
export class TypeItUpHomeLayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  authState$: Observable<{ user: string | null; loading: boolean }> = combineLatest([
    this.auth.user$,
    this.auth.loading$,
  ]).pipe(
    map(([user, loading]) => ({ user: user?.username || null, loading }))
  );

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onLogout(): void {
    this.auth.logout(); 
    this.navigateToLogin();
  }
}
