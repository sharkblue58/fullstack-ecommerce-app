import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of } from 'rxjs';
import { Country } from '../commons/country';
import { State } from '../commons/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private countryUrl = 'http://localhost:8080/api/countries';
  private stateUrl = 'http://localhost:8080/api/states';

  constructor(private http: HttpClient) { }

  getCridetCardMonths(startMonth: number):Observable<number[]> {
    let data: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getCridetCardYears():Observable<number[]> {
    let data: number[] = [];
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 10;

    for (let year = currentYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }

  getCountries():Observable<Country[]> {
    return this.http.get<GetResponseCountries>(this.countryUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string):Observable<State[]> {
    const searchStatesUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.http.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
