import { Component, OnInit, Input } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { CarDetail, Colour } from 'src/app/models/carDetail.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() public carId: string;
  public car: CarDetail = {
    brand: 'Dummy',
    colour: Colour.Black,
    engineDescription: 'Dummy',
    licensePlate: 'Dummy',
    model: 'Dummy',
    id: 'Dummy',
    mileage: 0,
    premiseName: 'None',
    rented: 'Not Rented'
  };

  constructor(private carService: CarsService, private router: Router) { }

  ngOnInit(): void {
    const result = this.carService.getCarDetail(this.carId);
    if (result) {
      result.subscribe(car => {
        console.log(car);
        this.car = car;
        this.car.colourName = Colour[this.car.colour];

        this.car.rented = this.car.rented ? 'Rented.' : 'Not rented.';
      }, error => console.log(error)
      );
    } else {
      this.router.navigate(['/error']);
    }
  }
}
