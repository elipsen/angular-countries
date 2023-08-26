import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CountriesService } from '../../services/countries.service.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor( private activatedRoute: ActivatedRoute, private countriesService: CountriesService, private router: Router ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //switchMap( params => this.countriesService.searchCountryByAlphaCode(params['id']))
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id)) // Desestructurando
      )
      //.subscribe(params => { // El subscribe cambia el resultado por el switchMap anterior, que modifica el resultado
      .subscribe( country => {
        if (!country) return this.router.navigateByUrl('');
        return this.country = country;
      })
  }
}
