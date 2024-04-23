import { Component } from '@angular/core';
import { QueryService } from '../_services/query.service';
import { CommonModule } from '@angular/common';
import { Mom } from '../_models/mom.model';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-moms',
  standalone: true,
  imports: [
    CommonModule,
    NgbPagination,
    NgxEchartsDirective
  ],
  templateUrl: './moms.component.html',
  styleUrl: './moms.component.scss',
  providers: [provideEcharts()]
})
export class MomsComponent {
  constructor(private queryService: QueryService) { }

  view: number = 0;       // 0 for first year moms, 1 for older moms
  moms: Mom[] = [];       // array of moms
  totalMoms: number = 0;  // total number of moms
  page: number = 1;       // current page
  pageSize: number = 10;  // number of moms per page

  options: EChartsOption;
  data: [string[], number[]];

  ngOnInit() { // gets the data for the first view
    this.queryService.first_year_moms(1, this.pageSize).subscribe(data => {
      this.moms = data;
    });
    this.queryService.first_year_moms_count().subscribe(data => {
      this.totalMoms = data;
    });
    this.options = {};
    this.queryService.avg_moms_by_year().subscribe((data) => {
      this.convertData(data);
      this.createChart();
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

  convertData(data: any[]) { // converts the data to be used in the graph
    this.data = [[], []];
    data.forEach(e => {
      this.data[0].push(e.mom_type);
      this.data[1].push(e.avg_weight_of__dams);
    });
  }

  createChart() { // creates the chart
    this.options = {
      legend: { // legend is the top part that shows the colors of the lines
        data: ['Average Weight']
      },
      xAxis: { // shows the labels on the x axis
        type: 'category',
        data: this.data[0],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: [ // shows the weight on the y axis, need one for both data sets
        {
          type: 'value',
          name: 'Weight',
          axisLabel: {
            formatter: '{value} lbs'
          },
          min: 0,
          max: 150
        }
      ],
      series: [ // the data that is shown on the graph
        {
          name: ('Average Weight'), // changes the name based on the view
          data: this.data[1],
          type: 'bar',
          yAxisIndex: 0
        }
      ]
    };
  }
}
