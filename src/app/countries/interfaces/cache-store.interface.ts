import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  // Al ser tipado y poder estar vacio al principio, y tratarse como de una enumaración
  // entonces le ponemos el opcional (?)
  term?: Region;
  countries: Country[];
}
