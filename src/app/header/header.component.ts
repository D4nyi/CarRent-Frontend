import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public static isLoggedin:boolean;
  public _isLoggedin: boolean;
  public collapsed = true;
  private authSub: Subscription;

  constructor(private auth: AuthService) { }

  public ngOnInit(): void {
    this.authSub =  this.auth.user.subscribe(user => {
      this._isLoggedin = !!user;
      HeaderComponent.isLoggedin = this._isLoggedin;
    });
  }

  public onLogout() {
    this.auth.logout();
  }

  public ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
