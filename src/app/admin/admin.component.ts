import { Component, OnInit } from '@angular/core';
import * as JwtDecode from 'jwt-decode';
import { IUser } from '../models/user.model';
import { Token } from '../models/token.model';
import { AppComponent } from '../app.component';
import { CarsService } from '../services/cars.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarDetail } from '../models/carDetail.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public darkMode: boolean;
  public cars: CarDetail[] = null;
  public warning: string;
  public valid = true;

  constructor(private carsService: CarsService, private router: Router, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    AppComponent.darkMode.subscribe(enabled => {
      this.darkMode = enabled;
    });

    this.carsService.listCars().subscribe(cars => {
      this.cars = cars;
    });

    const user: IUser = JSON.parse(localStorage.getItem('userData')) as IUser;
    console.log(JwtDecode<Token>(user._token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  }

  public onModify(car: CarDetail): void {
    this.router.navigate(['./modify'], { relativeTo: this.route, state: { car } });
  }
}
