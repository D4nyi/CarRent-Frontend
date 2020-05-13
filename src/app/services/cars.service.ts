import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarDetail } from '../models/carDetail.model';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { isNullOrWhiteSpace, handleError } from '../shared/helpers';
import { RentingResult } from '../models/renteningResult.model';
import { Renting } from '../models/renting.model';
import { catchError } from 'rxjs/operators';
import { Premise } from '../models/premise.model';

@Injectable({ providedIn: 'root' })
export class CarsService {
  constructor(private http: HttpClient) { }

  public listCars(): Observable<CarDetail[]> {
    return this.http.get<CarDetail[]>(environment.apiUrl + environment.carUrls.CARS);
  }

  public getCarDetail(carId: string): Observable<CarDetail> {
    if (isNullOrWhiteSpace(carId)) {
      return null;
    }
    return this.http.post<CarDetail>(environment.apiUrl + environment.carUrls.DETAIL, { carId })
      .pipe<CarDetail>(catchError<CarDetail, Observable<never>>(handleError));
  }

  public rentCar(renting: Renting) {
    return this.http.post<RentingResult>(environment.apiUrl + environment.carUrls.RENT, renting)
      .pipe<RentingResult>(catchError<RentingResult, Observable<never>>(handleError));
  }

  public cancelRent(carId: string, email: string, password: string) {
    return this.http.post<string>(environment.apiUrl + environment.carUrls.CANCEL, { carId, email, password })
      .pipe<string>(catchError<string, Observable<never>>(handleError));
  }

  public getRentedCar(email: string): Observable<CarDetail> {
    return this.http.get<CarDetail>(environment.apiUrl + environment.carUrls.RENTED + '/' + email)
      .pipe<CarDetail>(catchError<CarDetail, Observable<never>>(handleError));
  }

  public getPremises(): Observable<Premise[]> {
    return this.http.get<Premise[]>(environment.apiUrl + environment.premiseUrls.GET)
      .pipe<Premise[]>(catchError<Premise[], Observable<never>>(handleError));
  }

  public updateCar(car: CarDetail): Observable<object> {
    return this.http.post(environment.apiUrl + environment.adminUrls.UPDATE, car)
      .pipe(catchError(handleError));
  }

  public addCar(car: CarDetail): Observable<object> {
    return this.http.post(environment.apiUrl + environment.adminUrls.ADD, car)
      .pipe(catchError(handleError));
  }

  public deletecar(carId: string): Observable<object> {
    return this.http.post(environment.apiUrl + environment.adminUrls.DELTER, { carId })
      .pipe(catchError(handleError));
  }
}