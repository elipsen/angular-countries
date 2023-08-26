import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  @Input()
  public countries: Country[] = [];

  constructor( private countriesService: CountriesService) { }

  searchByRegion(region: string): void {
    this.countriesService.searchRegion(region).subscribe(countries => {
      this.countries = countries;
    })
  }
}
