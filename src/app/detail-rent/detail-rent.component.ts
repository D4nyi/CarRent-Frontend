import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail-rent',
  templateUrl: './detail-rent.component.html',
  styleUrls: ['./detail-rent.component.css']
})
export class DetailRentComponent implements OnInit {
  public carId: string;
  public valid = true;
  public times: { intervals: string, length: string }[] = [
    { intervals: 'hour(s)', length: '1-24' },
    { intervals: 'day(s)', length: '1-7' },
    { intervals: 'week', length: '1' }
  ];
  public selected = '';
  public max = 1;
  public isLoggedin: boolean;

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.carId = history.state.carId;
    this.authService.user.subscribe(user => {
      this.isLoggedin = !!user;
    });
  }
}
