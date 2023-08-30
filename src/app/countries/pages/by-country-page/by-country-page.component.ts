import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  @Input()
  public countries: Country[] = [];

  public term: string = '';

  constructor ( private countriesService: CountriesService) { }

  searchByCountry(term: string): void {
    this.countriesService.searchCountry(term).subscribe( countries => {
      this.countries = countries;
    });
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.term = this.countriesService.cacheStore.byCountries.term;
  }
}
