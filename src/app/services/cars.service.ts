import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { isNullOrWhiteSpace } from '../shared/helpers';
import { RentingResult } from '../models/renteningResult.model';
import { Renting } from '../models/renting.model';

@Injectable({ providedIn: 'root' })
export class CarsService {
  cars: Car[] = null;

  constructor(private http: HttpClient) { }

  public listCars(): Observable<Car[]> {
    return this.http.get<Car[]>(environment.apiUrl + environment.carUrls.CARS);
  }

  public getCarDetail(carId: string): Observable<Car> | null {
    if (isNullOrWhiteSpace(carId)) {
      return null;
    }
    return this.http.post<Car>(environment.apiUrl + environment.carUrls.DETAIL, { carId });
  }

  public rentCar(renting: Renting) {
    return this.http.post<RentingResult>(environment.apiUrl+environment.carUrls.RENT, renting);
  }

  public cancelRent(carId: string, rentingId: string) {
  }
}