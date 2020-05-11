import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { take, map } from 'rxjs/operators';
import { isAdmin } from '../shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe<User, boolean | UrlTree>(
      take<User>(1),
      map<User, boolean | UrlTree>((user: User) => {
        return (user && isAdmin(user)) ?
          true :
          this.router.createUrlTree(['/']);
      })
    );
  }
}
