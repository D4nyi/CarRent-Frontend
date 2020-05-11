import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../models/carDetail.model';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  public cars: CarDetail[] = null;
  public selected = 'all';
  public darkMode: boolean;
  private allCars: CarDetail[];

  constructor(private carsService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    AppComponent.darkMode.subscribe(enabled => {
      this.darkMode = enabled;
    });
    this.carsService.listCars().subscribe(cars => {
      this.allCars = cars.map<CarDetail>((car: CarDetail) => {
        car.imagePath = `../../assets/${car.imagePath}`
        return car;
      });
      this.cars = this.allCars;
    });
  }

  public rent(carId: string) {
    this.router.navigate(['/detail'], { state: { carId } });
  }

  public onClick(event: MouseEvent): void {
    this.selected = (event.target as HTMLElement).id;
    if (this.selected === 'all') {
      this.cars = this.allCars;
    } else if (this.selected === 'free') {
      this.cars = this.allCars.filter(car => car.rented === false);
    } else if (this.selected === 'rented') {
      this.cars = this.allCars.filter(car => car.rented === true);
    }
  }
}
