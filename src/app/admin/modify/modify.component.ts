import { Component, OnInit } from '@angular/core';
import { CarDetail, Colour } from 'src/app/models/carDetail.model';
import { NgForm } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { Premise } from 'src/app/models/premise.model';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html'
})
export class ModifyComponent implements OnInit {
  public car: CarDetail;
  public premises: Premise[];
  public colors: { name: string, key: number }[];

  constructor(private carService: CarsService) { }

  public ngOnInit(): void {
    this.car = history.state.car;
    if (this.car) {
      this.carService.getPremises()
        .subscribe(premises => {
          if (premises) {
            this.premises = premises;
          }
        }, error => {
          console.log(error);
        });
    } else {

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
    console.log(form.value);
  }
}