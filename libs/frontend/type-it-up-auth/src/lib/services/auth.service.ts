import {
  AUTHENTICATE_WITH_CODE,
  AUTHENTICATE_WITH_REFRESH_TOKEN,
  AuthenticateWithRefreshTokenMutation,
  LOGIN,
  SIGNUP,
} from '@/frontend/type-it-up-graphql';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

type User =
  AuthenticateWithRefreshTokenMutation['authenticateWithRefreshToken']['user'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  user$: Observable<User | null> = this.userSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.checkAuthentication();
  }


  isAuthenticated(): boolean{
    const token = localStorage.getItem('accessToken');
    return !!token 
  }


  private checkAuthentication() {
    this.loadingSubject.next(true);

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.loadingSubject.next(false);
      return;
    }

    this.apollo
      .mutate({
        mutation: AUTHENTICATE_WITH_REFRESH_TOKEN,
        variables: { refreshToken },
      })
      .subscribe({
        next: (result) => {
          if (!result.data) {
            this.userSubject.next(null);
            this.loadingSubject.next(false);
            return;
          }

          const { user, accessToken, refreshToken } =
            result.data.authenticateWithRefreshToken;

          if (user && accessToken && refreshToken) {
            this.userSubject.next(user);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          } else {
            this.userSubject.next(null);
          }

          this.loadingSubject.next(false);
        },
        error: (error) => {
          console.error('Authentication error:', error);
          this.userSubject.next(null);
          this.loadingSubject.next(false);
        },
      });
  }

  handleAuthCallback(code: string) {
    this.loadingSubject.next(true);
    return this.apollo
      .mutate({
        mutation: AUTHENTICATE_WITH_CODE,
        variables: { code },
      })
      .subscribe({
        next: (result) => {
          if (!result.data) {
            this.userSubject.next(null);
            this.loadingSubject.next(false);
            return;
          }

          const { user, accessToken, refreshToken } =
            result.data.authenticateWithCode;

          if (user && accessToken && refreshToken) {
            this.userSubject.next(user);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          } else {
            this.userSubject.next(null);
          }

          this.loadingSubject.next(false);
        },
        error: (error) => {
          console.error('Authentication error:', error);
          this.userSubject.next(null);
          this.loadingSubject.next(false);
        },
      });
  }

  handleLogin(email: string, password: string) {
    return this.apollo
      .mutate({
        mutation: LOGIN,
        variables: { email, password },
      })
      .pipe(
        map((result) => result.data?.authenticateWithUserPassword),
        tap((data) => {
          if (data) {
            this.userSubject.next(data.user);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('accessToken', data.accessToken);
          }
        })
      );
  }

  handleSignup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string
  ) {
    return this.apollo
      .mutate({
        mutation: SIGNUP,
        variables: { email, password, firstName, lastName, username },
      })
      .pipe(
        map((result) => {
          if (result.data?.registerUser) {
            localStorage.setItem(
              'refreshToken',
              result.data.registerUser.refreshToken
            );
            localStorage.setItem(
              'accessToken',
              result.data.registerUser.accessToken
            );
            this.userSubject.next(result.data.registerUser.user);
            return result.data.registerUser;
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.userSubject.next(null);
    this.loadingSubject.next(false);
  }
}
