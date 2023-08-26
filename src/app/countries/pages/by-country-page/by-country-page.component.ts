import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  @Input()
  public countries: Country[] = [];

  constructor ( private countriesService: CountriesService) { }

  searchByCountry(term: string): void {
    this.countriesService.searchCountry(term).subscribe( countries => {
      this.countries = countries;
    });
  }
}
