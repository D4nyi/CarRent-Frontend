import * as JwtDecode from 'jwt-decode';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Checks if the povided value is a string and it has at least 1 non-withespace chars
 * @param str value that should be tested
 * @returns  false if the provided value is a string and has at least 1 non-withespace chars, otherwise true
 */
export function isNullOrWhiteSpace(str: any): boolean {
  if (!str || typeof str !== 'string') return true;
  return str.trim().length < 1;
}

/**
 * Test if the password is not null or whitespace and has at least 10 chars, with upper and lowwer case letters, a numeric and a special
 * @param pwd Password that should be tested
 * @returns true if the password matches the criteria, otherwise false
 */
export function validatePassword(pwd: string): boolean {
  if (isNullOrWhiteSpace(pwd)) return false;
  const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})');
  return regex.test(pwd);
}

/**
 * Tests if the given birthDate was 18 years ago
 * @param birthDate Birthdate
 * @returns true if the birthDate was 18 years ago, otherwise false
 */
export function adultAge(birthDate: string | Date): boolean {
  if (typeof birthDate === 'string') {
    if (isNullOrWhiteSpace(birthDate)) {
      return false;
    }
    birthDate = new Date(birthDate);
  }

  const today = new Date();
  const month = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

/**
 * @returns tomorrow as a Date object
 */
export function tomorrow(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

/**
 * Tells if the user is in role Admin
 * @param user 
 * @returns true if the user is Admin, otherwise false
 */
export function isAdmin(user: User): boolean {
  if(!user) return false;
  const role: string = JwtDecode<Token>(user.token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return role === 'Admin';
}

export function handleError(errorRes: HttpErrorResponse): Observable<never> {
  let errorMsg = `Status: ${errorRes.statusText}, Code: ${errorRes.status}`;
  if (!errorRes) {
    errorMsg = 'Unkonw error occured!';
  }else if (errorRes.error && Object.keys(errorRes.error.errors).length !== 0) {
    errorMsg = `Cause: ${errorRes.error.errors.title}, Code: ${errorRes.status}`;
  } else if (errorRes.status === 422) {
    errorMsg = `Cause: ${errorRes.error.instance}, Code: ${errorRes.status}`;
  } else if (errorRes.status >= 400 && errorRes.statusText.toUpperCase() === 'OK') {
    errorMsg = `Cause: An unknown error occurred!, Code: ${errorRes.status}`;
  }

  return throwError(errorMsg);
}