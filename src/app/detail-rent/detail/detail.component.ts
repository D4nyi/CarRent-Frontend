import { Component, OnInit, Input } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { Car, Colour } from 'src/app/models/car.model';
import { isNullOrWhiteSpace } from 'src/app/shared/helpers';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() public carId: string;
  public car: Car = {
    brand: 'Dummy',
    colour: Colour.Black,
    engineDescription: 'Dummy',
    licensePlate: 'Dummy',
    model: 'Dummy',
    id: 'Dummy',
    mileage: 0,
    premise: null,
    premiseId: 'Dummy',
    reningId: 'Dummy',
    renting: null,
  };

  constructor(private carService: CarsService) { }

  ngOnInit(): void {
    const result = this.carService.getCarDetail(this.carId);
    if (result) {
      result.subscribe(car => {
        this.car = car;
        this.car.colourName = Colour[this.car.colour];
        this.car.rented = isNullOrWhiteSpace(this.car.reningId) && !!this.car.renting ? 'Not rented.' : 'Rented.';
      }, error => console.log(error)
      );
    }
  }
}
