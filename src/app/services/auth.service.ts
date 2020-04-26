import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, IUser } from '../models/user.model';
import { Signup } from '../models/signup.model';
import { AuthResult } from '../models/authResult.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  get isAuthenticated(): Observable<boolean> {
    return this.user.pipe<User, boolean>(take<User>(1), map<User, boolean>(user => !!user));
  }

  constructor(private http: HttpClient, private router: Router) { }

  public login(login: Login): Observable<AuthResult> {
    return this.http.post<AuthResult>(environment.apiUrl + environment.authUrls.LOGIN, login)
      .pipe<AuthResult, AuthResult>(
        catchError<AuthResult, Observable<never>>(this.handleError),
        tap(resData => {
          if (resData.error) {
            return throwError(resData.error);
          }
          this.handleAuthentication(resData.email, resData.name, resData.token, resData.expirationDate);
        })
      );
  }

  public signup(signup: Signup): Observable<unknown> {
    return this.http.post<AuthResult>(environment.apiUrl + environment.authUrls.SIGNIN, signup)
      .pipe<AuthResult, AuthResult>(
        catchError<AuthResult, Observable<never>>(this.handleError),
        tap(resData => {
          if (resData.error) {
            return throwError(resData.error);
          }
          this.handleAuthentication(resData.email, resData.name, resData.token, resData.expirationDate);
        })
      );
  }

  public autoLogin(): void {
    const userData: IUser = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.name,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    } else {
      this.logout('');
    }
  }

  public logout(redirectPath: string = '/auth'): void {
    this.user.next(null);
    this.router.navigate([redirectPath]);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, name: string, token: string, expirationDate: string): void {
    const expires = new Date(expirationDate);
    const user = new User(email, name, token, expires);
    this.user.next(user);
    this.autoLogout(expires.getTime() - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage + 'asd');
    }
    return throwError(errorMessage);
  }
}
