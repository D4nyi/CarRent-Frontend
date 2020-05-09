import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public static darkMode = new BehaviorSubject<boolean>(false);
  public title = 'CarRent';

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) { }

  public ngOnInit(): void {
    AppComponent.darkMode.subscribe(enabled => {
      if (enabled) {
        this.document.body.classList.add('darkMode');
      } else {
        this.document.body.classList.remove('darkMode');
      }
    });

    this.authService.autoLogin();
  }
}
