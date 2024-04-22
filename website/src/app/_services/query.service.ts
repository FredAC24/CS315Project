import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mom } from '../_models/mom.model';
import { MinMax } from '../_models/min_max.model';
import { MedianAvg } from '../_models/median_avg.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3000/query';

  // All functions return an observable that can be triggered to contact the API
  // Can call this function followed by .subscribe(data => { // do something with data });
  // Good example in moms.component.ts

  min_max_weight_yearly(): Observable<MinMax[]> {
    return this.httpClient.get<MinMax[]>(this.url + "/calc/min_max_weight_yearly");
  }

  median_avg_weight_yearly(): Observable<MedianAvg[]> {
    return this.httpClient.get<MedianAvg[]>(this.url + "/calc/median_avg_weight_yearly");
  }

  first_year_moms(page: number, pageLength?: number): Observable<Mom[]> {
    return this.httpClient.get<Mom[]>(this.url + "/moms/first_year_moms", {
      params: {
        page: page.toString(),
        pageLength: pageLength ? pageLength.toString() : '100'
      }
    });
  }

  first_year_moms_count(): Observable<number> {
    return this.httpClient.get<number>(this.url + "/moms/first_year_moms_count");
  }

  older_moms(page: number, pageLength?: number): Observable<Mom[]> {
    return this.httpClient.get<Mom[]>(this.url + "/moms/older_moms", {
      params: {
        page: page.toString(),
        pageLength: pageLength ? pageLength.toString() : '100'
      }
    });
  }

  older_moms_count(): Observable<number> {
    return this.httpClient.get<number>(this.url + "/moms/older_moms_count");
  }
}
