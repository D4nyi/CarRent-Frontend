import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CarsService } from '../services/cars.service';
import { Router } from '@angular/router';
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

  constructor(private carsService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    AppComponent.darkMode.subscribe(enabled => {
      this.darkMode = enabled;
    });

    this.carsService.listCars().subscribe(cars => {
      this.cars = cars.map<CarDetail>((car: CarDetail) => {
        car.imagePath = `../../assets/${car.imagePath}`
        return car;
      });
    });
  }

  public onModify(car: CarDetail): void {
    this.router.navigate(['/admin/modify'], { state: { car } });
  }
}
