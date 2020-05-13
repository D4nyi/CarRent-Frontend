import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { Premise } from 'src/app/models/premise.model';
import { Router } from '@angular/router';
import { isNullOrWhiteSpace } from 'src/app/shared/helpers';
import { Colour, CarDetail } from 'src/app/models/carDetail.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit, OnDestroy {
  public premises: Premise[];
  public colors: { name: string, key: number }[];
  public valid = true;
  public loadProblem = false;
  public sec = 10;
  private timer: NodeJS.Timeout;

  constructor(private carService: CarsService, private router: Router) { }

  public ngOnInit(): void {
    this.carService.getPremises()
      .subscribe(premises => {
        if (premises) {
          this.premises = premises;
        }
      }, error => {
        console.log(error);
        this.loadProblem = true;
        this.countDownTimer();
      });

    this.colors = Object.keys(Colour)
      .filter(k => typeof Colour[k] === 'string' && Colour[k] !== 'None')
      .map((k, i) => {
        return {
          key: i + 1,
          name: Colour[k]
        };
      });
  }

  public onAdd(form: NgForm): void {
    console.log(form.value as CarDetail);
    const brand = isNullOrWhiteSpace(form.value.brand);
    const model = isNullOrWhiteSpace(form.value.model);
    const colour = +form.value.colour < 1;
    const mileage = form.value.mileage < 1;
    const licensePlate = isNullOrWhiteSpace(form.value.licensePlate);
    const engineDescription = isNullOrWhiteSpace(form.value.engineDescription);
    const premiseId = isNullOrWhiteSpace(form.value.premiseId);
    if (brand || model || colour || mileage || licensePlate || engineDescription || premiseId) {
      this.valid = false;
      return;
    }
    this.valid = true;

    const car = {
      brand: form.value.brand,
      model: form.value.model,
      colour: +form.value.colour,
      mileage: form.value.mileage,
      licensePlate: form.value.licensePlate,
      engineDescription: form.value.engineDescription,
      premiseId: form.value.premiseId,
      id: null,
      imagePath: null
    };

    this.carService.addCar(car as CarDetail)
      .subscribe(() => {
        this.router.navigate(['/admin']);
      }, error => {
        console.log(error);
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