import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../models/carDetail.model';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  public cars: CarDetail[] = null;
  public selected = 'all';
  private allCars: CarDetail[];

  constructor(private carsService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    this.carsService.listCars().subscribe(cars => {
      console.log(cars);
      this.allCars = cars;
      this.cars = cars;
    });
  }

  public rent(carId: string) {
    this.router.navigate(['/detail'], { state: { carId } });
  }

  public onClick(event: MouseEvent): void {
    this.selected = (event.srcElement as HTMLElement).id;
    if (this.selected === 'all') {
      this.cars = this.allCars;
    } else if (this.selected === 'free') {
      this.cars = this.allCars.filter(car => car.rented === false);
    } else if (this.selected === 'rented') {
      this.cars = this.allCars.filter(car => car.rented === true);
    }
  }
}
