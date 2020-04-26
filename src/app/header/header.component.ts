import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isLoggedin: boolean;
  private isSuthSub: Subscription;

  constructor(private auth: AuthService) { }

  public ngOnInit(): void {
    this.isSuthSub = this.auth.isAuthenticated.subscribe(isAuth => this.isLoggedin = isAuth);
  }

  public onLogout() {
    this.auth.logout();
  }

  public ngOnDestroy(): void {
    this.isSuthSub.unsubscribe();
  }
}
