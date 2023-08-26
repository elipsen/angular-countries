import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs'
import { Country } from '../interfaces/country';

const _API_URL: string = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor( private http: HttpClient) { }

  searchCountryByAlphaCode( code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${_API_URL}/alpha/${code}`)
      .pipe(
        map(
          // Incluimos el map del pipe para controlar si devolvemos un pais o null, para evitar devolver un array
          countries => countries.length > 0 ? countries[0] : null
        ),
        catchError( error => {
           // Capturamos el error, lo mostramos y retornamos vacio para evitar mal funcionamiento
          console.log(error);
          return of(null);
        })
      );
  }

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
