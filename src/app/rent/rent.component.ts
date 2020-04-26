import { Component, OnInit, Input } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  carId: string = 'Semmi';
  valid: boolean = true;
  times: { intervals: string, length: string }[] = [
    { intervals: 'hour(s)', length: '1-24' },
    { intervals: 'day(s)', length: '1-7' },
    { intervals: 'week', length: '1' }
  ];
  selected: string = '';
  max: number = 1;

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.carId = history.state.carId;
    this.carsService.getCarDetail(this.carId);
  }

  onChange(target: EventTarget) {
    const select = <HTMLSelectElement>target;
    if (this.isNullOrWhiteSpace(select.value)) {
      this.max = 1;
      this.selected = '';
      return;
    }
    this.selected = this.times.find(el => el.intervals === select.value).length;
    this.max = this.selected !== '1' ?
      +this.selected.split('-')[1] :
      +this.selected;
  }

  onSubmit(form: NgForm) {
    const range = this.selected.split('-');

    if (form.untouched ||
      (!range[1] && form.value.number !== 1) ||
      (form.value.number < +range[0] || form.value.number > +range[1]) ||
      (this.isNullOrWhiteSpace(form.value.firstName) || this.isNullOrWhiteSpace(form.value.firstName))) {
      this.valid = false;
      return;
    }
    this.valid = true;
    
    this.carsService.rentCar(this.carId);
  }

  private isNullOrWhiteSpace(str: any): boolean {
    if (!str || typeof str !== 'string') return true;
    return str.trim().length < 1;
  }
}
