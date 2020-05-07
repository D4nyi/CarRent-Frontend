import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CarDetail } from '../models/carDetail.model';
import { environment } from 'src/environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { isNullOrWhiteSpace } from '../shared/helpers';
import { RentingResult } from '../models/renteningResult.model';
import { Renting } from '../models/renting.model';
import { catchError } from 'rxjs/operators';

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
    return this.http.post<CarDetail>(environment.apiUrl + environment.carUrls.DETAIL, { carId });
  }

  public rentCar(renting: Renting) {
    return this.http.post<RentingResult>(environment.apiUrl + environment.carUrls.RENT, renting)
      .pipe<RentingResult>(catchError<RentingResult, Observable<never>>(this.handleError));
  }

  public cancelRent(carId: string, email: string, password: string) {
    return this.http.post<string>(environment.apiUrl + environment.carUrls.CANCEL, { carId, email, password })
      .pipe<string>(catchError<string, Observable<never>>(this.handleError));
  }

  public getRentedCar(email: string): Observable<CarDetail> {
    return this.http.get<CarDetail>(environment.apiUrl + environment.carUrls.RENTED + '/' + email)
      .pipe<CarDetail>(catchError<CarDetail, Observable<never>>(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMsg = `Status: ${errorRes.statusText}, Code: ${errorRes.status}`;
    if (errorRes.error && Object.keys(errorRes.error.errors).length !== 0) {
      errorMsg = `Cause: ${errorRes.error.errors.title}, Code: ${errorRes.status}`;
    } else if (errorRes.status === 422) {
      errorMsg = `Cause: ${errorRes.error.instance}, Code: ${errorRes.status}`;
    } else if (errorRes.status >= 400 && errorRes.statusText.toUpperCase() === 'OK') {
      errorMsg = `Cause: An unknown error occurred!, Code: ${errorRes.status}`;
    }

    return throwError(errorMsg);
  }
}