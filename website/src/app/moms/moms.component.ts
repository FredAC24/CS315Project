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

  view: number = 0;
  moms: Mom[] = [];
  totalMoms: number = 0;
  page: number = 1;
  pageSize: number = 20;

  ngOnInit() {
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

  setView(view: number) {
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
}
