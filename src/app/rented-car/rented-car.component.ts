import { Component, OnInit } from '@angular/core';
import { Colour, CarDetail } from '../models/carDetail.model';
import { NgForm } from '@angular/forms';
import { validatePassword, isNullOrWhiteSpace } from '../shared/helpers';
import { CarsService } from '../services/cars.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-rented-car',
  templateUrl: './rented-car.component.html',
  styleUrls: ['./rented-car.component.css']
})
export class RentedCarComponent implements OnInit {
  public valid = true;
  public noRent = false;
  public onError = false;
  public errorMsg: string;
  public success: string;
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

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    if (!isNullOrWhiteSpace(this.success)) {
      this.noRent = true;
    }
    const user = JSON.parse(localStorage.getItem('userData')) as IUser;
    this.carsService.getRentedCar(user.email)
      .subscribe(rented => {
        console.log(rented);
        this.car = rented;
      });
  }

  public onCancel(form: NgForm): void {
    this.onError = false;
    if (isNullOrWhiteSpace(form.value.email) || validatePassword(form.value.password)) {
      this.valid = false;
    }
    this.carsService.cancelRent(form.value.email, form.value.password)
      .subscribe(() => {
        this.noRent = false;
        this.ngOnInit();
      }, error => {
        this.onError = true;
        this.errorMsg = error;
      });
  }
}
