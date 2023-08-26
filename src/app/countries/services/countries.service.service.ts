import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs'
import { Country } from '../interfaces/country';

const _API_URL: string = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor( private http: HttpClient) { }

  searchCapital(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${_API_URL}/capital/${term}`)
      .pipe(
        catchError( error => {
           // Capturamos el error, lo mostramos y retornamos vacio para evitar mal funcionamiento
          console.log(error);
          return of([]);
        })
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${_API_URL}/name/${term}`)
      .pipe(
        catchError( error => {
           // Capturamos el error, lo mostramos y retornamos vacio para evitar mal funcionamiento
          console.log(error);
          return of([]);
        })
      );
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${_API_URL}/region/${region}`)
    .pipe(
      catchError( error => {
         // Capturamos el error, lo mostramos y retornamos vacio para evitar mal funcionamiento
        console.log(error);
        return of([]);
      })
    );
  }
}
