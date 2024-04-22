import { Component } from '@angular/core';
import { QueryService } from '../_services/query.service';
import { CommonModule } from '@angular/common';
import { Mom } from '../_models/mom.model';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-moms',
  standalone: true,
  imports: [
    CommonModule,
    NgbPagination
  ],
  templateUrl: './moms.component.html',
  styleUrl: './moms.component.scss'
})
export class MomsComponent {
  constructor(private queryService: QueryService) {}

  view: number = 0;       // 0 for first year moms, 1 for older moms
  moms: Mom[] = [];       // array of moms
  totalMoms: number = 0;  // total number of moms
  page: number = 1;       // current page
  pageSize: number = 20;  // number of moms per page

  ngOnInit() { // gets the data for the first view
    this.queryService.first_year_moms(1, this.pageSize).subscribe(data => {
      this.moms = data;
    });
    this.queryService.first_year_moms_count().subscribe(data => {
      this.totalMoms = data;
    });
  }

  getMoms(page: number) {
    switch (this.view) {
      case 0:
        this.queryService.first_year_moms(page, this.pageSize).subscribe(data => {
          this.moms = data;
        });
        break;
      case 1:
        this.queryService.older_moms(page, this.pageSize).subscribe(data => {
          this.moms = data;
        });
        break;
    }
  }

  setView(view: number) { // same as in graph.component.ts, changes the view and gets the data
    this.view = view;
    this.page = 1;
    switch (view) {
      case 0:
        this.queryService.first_year_moms(1, this.pageSize).subscribe(data => {
          this.moms = data;
        });
        this.queryService.first_year_moms_count().subscribe(data => {
          this.totalMoms = data;
        });
        break;
      case 1:
        this.queryService.older_moms(1, this.pageSize).subscribe(data => {
          this.moms = data;
        });
        this.queryService.older_moms_count().subscribe(data => {
          this.totalMoms = data;
        });
        break;
    }
  }

  getFormattedDate(date: string) { // formats the date to be more readable
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
}
