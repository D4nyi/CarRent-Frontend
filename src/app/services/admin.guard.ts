import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { take, map } from 'rxjs/operators';
import * as JwtDecode from 'jwt-decode';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe<User, boolean | UrlTree>(
      take<User>(1),
      map<User, boolean | UrlTree>((user: User) => {
        if (!!user) {
          const role: string = JwtDecode<Token>(user.token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          if (role === 'Admin'){
            return true;
          }
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }

}
