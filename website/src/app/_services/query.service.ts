import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mom } from '../_models/mom.model';
import { MinMax } from '../_models/min_max.model';
import { MedianAvg } from '../_models/median_avg.model';
import { AvgParentWeight } from '../_models/avg_parent_weight.model';
import { Goat } from '../_models/goat.model';
import { AllTypesAvg, AvgYearly } from '../_models/twins.model';

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

  avg_moms_by_year(): Observable<Object[]> {
    return this.httpClient.get<Object[]>(this.url + "/moms/avg_moms_by_year");
  }

  avg_first_year_moms(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + "/moms/avg_first_year_moms");
  }

  avg_older_moms(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + "/moms/avg_older_moms");
  }

  avg_weight_of_parent_yearly(): Observable<AvgParentWeight[]> {
    return this.httpClient.get<AvgParentWeight[]>(this.url + "/dams/avg_weight_of_parent_yearly");
  }

  get_goat_by_tag(tag: string): Observable<Goat[]> {
    return this.httpClient.get<Goat[]>(this.url + "/goats/get_goat_by_tag", {
      params: {
        tag: tag
      }
    });
  }

  get_goat_by_id(id: number): Observable<Goat[]> {
    return this.httpClient.get<Goat[]>(this.url + "/goats/get_goat_by_id", {
      params: {
        id: id.toString()
      }
    });
  }

  avg_weight_of_all_types(): Observable<AllTypesAvg[]> {
    return this.httpClient.get<AllTypesAvg[]>(this.url + "/twins/birth/avg_weight_of_all_types");
  }

  avg_weight_singles_yearly(): Observable<AvgYearly[]> {
    return this.httpClient.get<AvgYearly[]>(this.url + "/twins/birth/avg_weight_singles_yearly");
  }

  avg_weight_twins_yearly(): Observable<AvgYearly[]> {
    return this.httpClient.get<AvgYearly[]>(this.url + "/twins/birth/avg_weight_twins_yearly");
  }

  avg_weight_triplets_yearly(): Observable<AvgYearly[]> {
    return this.httpClient.get<AvgYearly[]>(this.url + "/twins/birth/avg_weight_triplets_yearly");
  }

  avg_weight_of_all_types_current(): Observable<AllTypesAvg[]> {
    return this.httpClient.get<AllTypesAvg[]>(this.url + "/twins/current/avg_weight_of_all_types");
  }

  avg_weight_singles_current(): Observable<AvgYearly[]> {
    return this.httpClient.get<AvgYearly[]>(this.url + "/twins/current/avg_weight_singles_yearly");
  }

  avg_weight_twins_current(): Observable<AvgYearly[]> {
    return this.httpClient.get<AvgYearly[]>(this.url + "/twins/current/avg_weight_twins_yearly");
  }

  avg_weight_triplets_current(): Observable<AvgYearly[]> {
    return this.httpClient.get<AvgYearly[]>(this.url + "/twins/current/avg_weight_triplets_yearly");
  }
}
