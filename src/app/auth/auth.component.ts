import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { validatePassword, isNullOrWhiteSpace } from '../shared/helpers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public valid = true;

  constructor(private auth: AuthService, private router: Router) { }

  public onLogin(form: NgForm): void {
    if (isNullOrWhiteSpace(form.value.email) || validatePassword(form.value.password)) {
      this.valid = false;
    }
    this.auth.login({
      email: form.value.email,
      password: form.value.password
    }).subscribe(() => {
      this.router.navigate(['/cars'])
    }, error => {
      console.log(error);
    });
  }
}
