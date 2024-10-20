import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.user$,
      this.authService.loading$,
    ]).pipe(
      filter(([user, loading]) => !!user || !loading),
      map(([user]) => {
        if (!user) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
