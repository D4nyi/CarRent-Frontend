import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  send() {
    let login: Login = {
      email: 'test@example.com',
      password: '123456789A!'
    };

    this.auth.login(login).subscribe(result => {
      console.log(result);
    });
  }

  ngOnDestroy() {
  }
}
