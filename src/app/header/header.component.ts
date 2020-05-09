import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedin: boolean;
  public collapsed = true;
  public darkMode = false;

  constructor(private auth: AuthService) { }

  public ngOnInit(): void {
    AppComponent.darkMode.subscribe(enabled => {
      this.darkMode = enabled;
    });
    this.auth.user.subscribe(user => {
      this.isLoggedin = !!user;
    });
  }

  public onChange(event: any): void {
    AppComponent.darkMode.next(event.target.checked);
  }

  public onLogout() {
    this.auth.logout();
  }
}
