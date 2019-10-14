import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, flatMap, toArray } from 'rxjs/operators';

export const API = 'http://ec2-13-229-233-153.ap-southeast-1.compute.amazonaws.com:3000/countries';

export interface ICountry {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ICountry[]>(API).toPromise();
  }
}
