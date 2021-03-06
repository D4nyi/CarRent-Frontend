import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarDetail, Colour } from 'src/app/models/carDetail.model';
import { NgForm } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { Premise } from 'src/app/models/premise.model';
import { Router } from '@angular/router';
import { isNullOrWhiteSpace } from 'src/app/shared/helpers';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html'
})
export class ModifyComponent implements OnInit, OnDestroy {
  public car: CarDetail;
  public premises: Premise[];
  public colors: { name: string, key: number }[];
  public valid = true;
  public loadProblem = false;
  public sec = 10;
  private timer: NodeJS.Timeout;

  constructor(private carService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    this.car = history.state.car;
    if (this.car) {
      this.car.imagePath = '../' + this.car.imagePath;
      this.carService.getPremises()
        .subscribe(premises => {
          if (premises) {
            this.premises = premises;
          }
        }, console.log);
    } else {
      this.loadProblem = true;
      this.countDownTimer();
    }

    this.colors = Object.keys(Colour)
      .filter(k => typeof Colour[k] === 'string' && Colour[k] !== 'None')
      .map((k, i) => {
        return {
          key: i + 1,
          name: Colour[k]
        };
      });
  }

  public onModify(form: NgForm): void {
    const id = isNullOrWhiteSpace(form.value.id);
    const brand = isNullOrWhiteSpace(form.value.brand);
    const model = isNullOrWhiteSpace(form.value.model);
    const colour = form.value.colour < 1;
    const mileage = form.value.mileage < 1;
    const licensePlate = isNullOrWhiteSpace(form.value.licensePlate);
    const engineDescription = isNullOrWhiteSpace(form.value.engineDescription);
    console.log(form.value);
    if (id || brand || model || colour || mileage || licensePlate || engineDescription) {
      this.valid = false;
      return;
    }
    this.valid = true;
    this.carService.updateCar(form.value)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/admin']);
      }, console.log);
  }

  public onDelete() {
    this.carService.deletecar(this.car.id).subscribe(result => {
      console.log(result);
      this.router.navigate(['/admin']);
    });
  }

  private countDownTimer(): void {
    this.timer = setInterval(() => {
      this.updateSec();
    }, 1000);
  }

  private updateSec(): void {
    this.sec--;
    if (this.sec === 0) {
      clearInterval(this.timer);
      this.router.navigate(['/admin']);
    }
  }

  public ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}