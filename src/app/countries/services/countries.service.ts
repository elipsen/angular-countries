import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, delay, tap } from 'rxjs'
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

const _API_URL: string = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {term: '', countries: []}
  }

  constructor( private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountryRequest( url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => {
          return of([]);
        }),
        // Este delay del pipe sirve para darle X t iempo antes de realizar la petición
        // delay(2000)
      );
  }

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
    return this.getCountryRequest(`${_API_URL}/capital/${term}`)
      .pipe(
        tap(countries => {
          this.cacheStore.byCapital.term = term;
          this.cacheStore.byCapital.countries = countries;
        }),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountryRequest(`${_API_URL}/name/${term}`)
      .pipe(
        // En ECMA 6 y superiores, si una propiedad se llama igual que la variable a
        // asignar, se puede obviar esto. Es decir term: term puede indicarse como term
        tap(countries => this.cacheStore.byCountries = {term, countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getCountryRequest(`${_API_URL}/region/${region}`)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {term: region, countries}),
        tap(() => this.saveToLocalStorage())
      );
  }
}
