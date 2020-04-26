import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  valid: boolean = true;

  constructor(private auth: AuthService, private router: Router) { }

  public onLogin(form: NgForm) {
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})');
    if (regex.test(form.value.password)) {
      return 'Invalid password format!'
    }
    this.auth.login({
      email: form.value.email,
      password: form.value.password
    }).subscribe(response => {
      console.log(response);
      this.router.navigate(['/get'])
    },
      error => {
        console.log(error);
      });
  }
}
