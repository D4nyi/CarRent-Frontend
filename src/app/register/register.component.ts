import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { isNullOrWhiteSpace, adultAge, validatePassword } from '../shared/helpers';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Register } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public warning: string;
  public valid = true;
  private readonly defaultWarning = 'Credentials are invalid!';

  constructor(private authService: AuthService, private router: Router) {
    this.warning = this.defaultWarning;
  }

  public onRegister(form: NgForm): void {
    const fname = isNullOrWhiteSpace(form.value.firstName);
    const lname = isNullOrWhiteSpace(form.value.lastName);
    const birthDate = !adultAge(form.value.birthDate);
    const address = isNullOrWhiteSpace(form.value.address);
    const password = !validatePassword(form.value.password);
    const userName = isNullOrWhiteSpace(form.value.userName);
    const email = isNullOrWhiteSpace(form.value.email);

    if (fname || lname || birthDate || address || password || userName || email) {
      this.valid = false;
      return;
    }

    this.authService.register({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      birthDate: form.value.birthDate,
      address: form.value.address,
      password: form.value.password,
      userName: form.value.userName,
      email: form.value.email
    }).subscribe((result: Register) => {
      this.valid = true;
      this.warning = this.defaultWarning;
      this.authService.login({
        email: result.email,
        password: form.value.password
      }).subscribe(() => {
        this.router.navigate(['/cars']);
      });
    }, error => {
      this.valid = false;
      this.warning = error;
    });
  }
}
