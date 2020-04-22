import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Login, Token } from './login.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  public login(login: Login) {
    return this.http.post<Token>('https://localhost:5001/api/auth/login', login)
      .subscribe(token => {
        this.cookie.set('token', token.token, new Date(token.expires), undefined, undefined, undefined, 'Lax');
        this.router.navigate(['/']);
      });
  }
}
