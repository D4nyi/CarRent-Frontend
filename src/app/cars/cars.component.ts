import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: Car[] = null;

  constructor(private carsService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    // this.http.get('https://localhost:5001/api/car', {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    //   .subscribe((data: any) => {
    //     this.json = JSON.stringify(data, undefined, 2)
    //   }, error => {
    //       if (error) {
    //         this.json = 'Problem occured!';
    //       }
    //     });
    this.carsService.listCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  public rent(carId: string) {
    this.router.navigate(['/detail'], { state: { carId } });
  }
}
