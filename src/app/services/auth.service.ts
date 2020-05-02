import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, IUser } from '../models/user.model';
import { Signup } from '../models/signup.model';
import { AuthResult } from '../models/authResult.model';
import { Register } from '../models/register.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  public register(register: Register): Observable<Register> {
    return this.http.post<Register>(environment.apiUrl + environment.authUrls.REGISTER, register)
      .pipe<Register>(
        catchError<Register, Observable<never>>(this.handleError)
      );
  }

  public login(login: Login): Observable<AuthResult> {
    return this.http.post<AuthResult>(environment.apiUrl + environment.authUrls.LOGIN, login)
      .pipe<AuthResult, AuthResult>(
        catchError<AuthResult, Observable<never>>(this.handleError),
        tap<AuthResult>(resData => {
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
    console.log(errorRes);
    if (errorRes.error || errorRes.error.errors) {
      return throwError(`Cause: ${errorRes.error.errors.title}, Code: ${errorRes.status}`);
    } else if (errorRes.status >= 400 && errorRes.statusText.toUpperCase() === 'OK') {
      return throwError(`Cause: An unknown error occurred!, Code: ${errorRes.status}`);
    }

    return throwError(`Status: ${errorRes.statusText}, Code: ${errorRes.status}`);
  }
}
