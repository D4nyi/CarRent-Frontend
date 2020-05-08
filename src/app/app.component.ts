import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public static darkMode = new Subject<boolean>();
  public static isLoggedin: boolean;
  public title = 'CarRent';

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) { }

  public ngOnInit(): void {
    AppComponent.darkMode.subscribe(() => {
      this.document.body.classList.toggle('darkMode');
    });

    this.authService.autoLogin();

    this.authService.user.subscribe(user => {
      AppComponent.isLoggedin = !!user;
    });
  }
}
