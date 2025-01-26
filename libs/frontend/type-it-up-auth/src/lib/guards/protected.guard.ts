import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProtectedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.user$,
      this.authService.loading$,
    ]).pipe(
      filter((arr) => !arr[1]),
      map(([user]) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
