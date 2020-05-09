import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../models/carDetail.model';
import { NgForm } from '@angular/forms';
import { isNullOrWhiteSpace } from '../shared/helpers';
import { CarsService } from '../services/cars.service';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rented-car',
  templateUrl: './rented-car.component.html',
  styleUrls: ['./rented-car.component.css']
})
export class RentedCarComponent implements OnInit {
  public valid = true;
  public checked = false;
  public onError = false;
  public errorMsg: string;
  public success: string;
  public car: CarDetail = null;

  constructor(private carsService: CarsService, private router: Router) { }

  ngOnInit(): void {
    const timer = setTimeout(() => {
      this.router.navigate(['/']); // error
    }, 10_000);

    if (!isNullOrWhiteSpace(this.success)) {
      this.checked = true;
    }
    const user = JSON.parse(localStorage.getItem('userData')) as IUser;
    this.carsService.getRentedCar(user.email)
      .subscribe(rented => {
        if (rented) {
          this.car = rented;
        }
        clearTimeout(timer);
        this.checked = true;
      }, () => {
        this.checked = false;
      });
  }

  public onCancel(form: NgForm): void {
    this.onError = false;
    if (isNullOrWhiteSpace(form.value.email) || isNullOrWhiteSpace(form.value.password)) {
      this.valid = false;
      return;
    }
    this.carsService.cancelRent(this.car.id, form.value.email, form.value.password)
      .subscribe(() => {
        this.checked = false;
        this.ngOnInit();
      }, error => {
        this.onError = true;
        this.errorMsg = error;
      });
  }
}
