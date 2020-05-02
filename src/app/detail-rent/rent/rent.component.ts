import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { isNullOrWhiteSpace } from 'src/app/shared/helpers';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html'
})
export class RentComponent {
  public carId: string;
  public valid = true;
  public times: { intervals: string, length: string }[] = [
    { intervals: 'hour(s)', length: '1-24' },
    { intervals: 'day(s)', length: '1-7' },
    { intervals: 'week', length: '1' }
  ];
  public selected = '';
  public max = 1;

  constructor(private carsService: CarsService) { }

  public onChange(target: EventTarget): void {
    const select = target as HTMLSelectElement;
    if (isNullOrWhiteSpace(select.value)) {
      this.max = 1;
      this.selected = '';
      return;
    }
    this.selected = this.times.find(el => el.intervals === select.value).length;
    this.max = this.selected !== '1' ?
      +this.selected.split('-')[1] :
      +this.selected;
  }

  public onSubmit(form: NgForm): void {
    const range = this.selected.split('-');
    if (form.untouched ||
      (!range[1] && form.value.number !== 1) ||
      (form.value.number < +range[0] || form.value.number > +range[1]) ||
      (isNullOrWhiteSpace(form.value.email) || isNullOrWhiteSpace(form.value.password))) {
      this.valid = false;
      return;
    }
    this.valid = true;

    console.log(form.value);

    this.carsService.rentCar({
      carId: this.carId,
      email: form.value.email,
      password: form.value.password,
      end: '',
      start: '',
      userId: ''
    });
  }
}