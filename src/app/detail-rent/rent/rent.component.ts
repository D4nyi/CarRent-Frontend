import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { isNullOrWhiteSpace, validatePassword, tomorrow } from 'src/app/shared/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  @Input() public carId: string;
  public valid = true;
  public onError = false;
  public errorMsg:string;
  public times: { interval: string, range: string }[] = [
    { interval: 'hour(s)', range: '1-24' },
    { interval: 'day(s)', range: '1-7' },
    { interval: 'week', range: '1' }
  ];
  public selected = '1';
  public max = 1;
  public minDate: string;
  public additionlInfo = '';
  private selectedTime: { interval: string, range: string };

  constructor(private carsService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    const tm = tomorrow();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(tm)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(tm)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(tm)
    this.minDate = `${ye}-${mo}-${da}`;
  }

  public onChange(target: EventTarget): void {
    const select = target as HTMLSelectElement;
    if (isNullOrWhiteSpace(select.value)) {
      this.max = 1;
      this.selected = '';
      return;
    }
    this.selectedTime = this.times.find(el => el.interval === select.value);
    this.selected = this.selectedTime.range;
    this.max = this.selected !== '1' ?
      +this.selected.split('-')[1] :
      +this.selected;
  }

  public onSubmit(form: NgForm): void {
    this.additionlInfo = '';
    this.valid = true;

    const range = this.selected.split('-');

    if (range.length === 1) {
      form.value.number = 1;
    }

    if (!Number.isInteger(form.value.number) || (range.length === 2 && (form.value.number < 1 && form.value.number > +range[1]))) {
      this.valid = false;
      this.additionlInfo += 'Renting range invalid';
    }

    const start = new Date(form.value.pickupDate);

    if (start < new Date(this.minDate)) {
      this.valid = false;
      if (!isNullOrWhiteSpace(this.additionlInfo)) {
        this.additionlInfo += ', ';
      }
      this.additionlInfo += 'You can\'t pick up any cars today';
    }

    if (form.untouched || (isNullOrWhiteSpace(form.value.email) || isNullOrWhiteSpace(form.value.password)) || !this.valid) {
      if (!isNullOrWhiteSpace(this.additionlInfo)) {
        this.additionlInfo += '!';
      }
      return;
    }


    const end = this.getReturnDate(start, this.selectedTime.interval, form.value.number);

    this.carsService.rentCar({
      carId: this.carId,
      email: form.value.email,
      password: form.value.password,
      end: end.toISOString(),
      start: start.toISOString()
    }).subscribe(()=>{
      this.router.navigate(['rented']);
    }, error =>{
      this.onError = true;
      this.errorMsg = error;
    });
  }

  private getReturnDate(start: Date, interval: string, number: number): Date {
    start = new Date(start.valueOf());

    let hours = 0;
    switch (interval) {
      case 'hour(s)':
        hours = number;
        break;
      case 'day(s)':
        hours = number * 24
        break;
      case 'week':
        hours = 7 * 24;
        break;
      default:
        throw new Error("Invalid interval");
    }

    start.setTime(start.getTime() + (hours * 60 * 60 * 1000));
    return start;
  }
}