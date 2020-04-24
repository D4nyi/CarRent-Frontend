import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  valid: boolean = true;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  public onLogin(form: NgForm){
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})');
    if (regex.test(form.value.password)) {
      return 'Invalid password format!'
    }
    
    console.log(form.value);
  }

  ngOnDestroy(): void {
  }
}
