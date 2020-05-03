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
  cars: CarDetail[] = null;

  constructor(private carsService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    this.carsService.listCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  public rent(carId: string) {
    this.router.navigate(['/detail'], { state: { carId } });
  }
}
