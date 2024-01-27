import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'lib-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <p *ngIf="loading$ | async">Authenticating...</p>
    </div>
  `,
})
export class CallbackComponent implements OnInit, OnDestroy {
  loading$!: Observable<boolean>;
  user$!: typeof AuthService.prototype.user$;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.loading$ = this.authService.loading$;
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (!code) {
      this.router.navigate(['/']);
      return;
    }
    this.authService.handleAuthCallback(code);

    combineLatest([this.loading$, this.user$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([loading, user]) => {
        if (!loading && user) {
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
