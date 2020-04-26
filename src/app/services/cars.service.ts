import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarsService {
    json: string = `[
        {
          "id": "d98e39d1-cc7e-4921-b782-ef8fa6ec0eb9",
          "brand": "VW",
          "model": "Golf",
          "colour": 3,
          "licensePlate": "RPP-469",
          "engineDescription": "1.4 TSI, 122HP, 200Nm",
          "mileage": 6.5,
          "premiseId": null,
          "premise": null,
          "tenantId": null,
          "tenant": null
        },
        {
          "id": "94025485-e9e1-461d-b271-26e64e5b6a8c",
          "brand": "VW",
          "model": "Golf",
          "colour": 3,
          "licensePlate": "RPP-469",
          "engineDescription": "1.4 TSI, 122HP, 200Nm",
          "mileage": 6.5,
          "premiseId": null,
          "premise": null,
          "tenantId": null,
          "tenant": null
        },
        {
          "id": "d98e39d1-cc7e-4921-b782-ef8fa6ec0eb9",
          "brand": "VW",
          "model": "Golf",
          "colour": 3,
          "licensePlate": "RPP-469",
          "engineDescription": "1.4 TSI, 122HP, 200Nm",
          "mileage": 6.5,
          "premiseId": null,
          "premise": null,
          "tenantId": null,
          "tenant": null
        },
        {
          "id": "94025485-e9e1-461d-b271-26e64e5b6a8c",
          "brand": "VW",
          "model": "Golf",
          "colour": 3,
          "licensePlate": "RPP-469",
          "engineDescription": "1.4 TSI, 122HP, 200Nm",
          "mileage": 6.5,
          "premiseId": null,
          "premise": null,
          "tenantId": null,
          "tenant": null
        },
        {
          "id": "d98e39d1-cc7e-4921-b782-ef8fa6ec0eb9",
          "brand": "VW",
          "model": "Golf",
          "colour": 3,
          "licensePlate": "RPP-469",
          "engineDescription": "1.4 TSI, 122HP, 200Nm",
          "mileage": 6.5,
          "premiseId": null,
          "premise": null,
          "tenantId": null,
          "tenant": null
        },
        {
          "id": "94025485-e9e1-461d-b271-26e64e5b6a8c",
          "brand": "VW",
          "model": "Golf",
          "colour": 3,
          "licensePlate": "RPP-469",
          "engineDescription": "1.4 TSI, 122HP, 200Nm",
          "mileage": 6.5,
          "premiseId": null,
          "premise": null,
          "tenantId": null,
          "tenant": null
        }
      ]`;
    cars: Car[] = null;

    constructor(private http: HttpClient) {
        this.cars = JSON.parse(this.json);
    }

    public listCars(): Car[] {
        return this.cars;
    }

    public getCarDetail(carId: string):Car {
        return this.cars.find(car => car.id === carId);
    }

    public rentCar(carId: string) {
    }

    public declineRent(carId: string, rentingId: string) {
    }
}