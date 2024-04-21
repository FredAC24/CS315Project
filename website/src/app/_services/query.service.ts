import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mom } from '../_models/mom.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private httpClient: HttpClient) { }

  private url = 'http://localhost:3000/query';

  min_max_weight_yearly(): Observable<any> {
    return this.httpClient.get(this.url + "/min_max_weight_yearly");
  }

  median_avg_weight_yearly(): Observable<any> {
    return this.httpClient.get(this.url + "/median_avg_weight_yearly");
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