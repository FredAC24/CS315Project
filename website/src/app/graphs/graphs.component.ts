import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { QueryService } from '../_services/query.service';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { MinMax } from '../_models/min_max.model';
import { MedianAvg } from '../_models/median_avg.model';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss',
  providers: [provideEcharts()]
})
export class GraphsComponent {
  constructor(private queryService: QueryService) {}

  options: EChartsOption;
  data: [number[], number[]];
  years: number[];
  view = 0;


  ngOnInit() {
    this.options = {};
    // Gets the starter data for the min max graph
    this.queryService.min_max_weight_yearly().subscribe((data) => {
      data.pop(); // Removes the last element which is always null
      this.convertMinMaxData(data);
    });
  }

  setView(view: number) { // is triggered when the buttons at the top of the page are clicked
    this.view = view;     // view is 0 for min/max and 1 for median/avg. this changes the data
    if (view === 0) {
      this.queryService.min_max_weight_yearly().subscribe((data) => {
        data.pop();
        this.convertMinMaxData(data);
      });
    } else if (view === 1) {
      this.queryService.median_avg_weight_yearly().subscribe((data) => {
        data.pop();
        this.convertMedAvgData(data);
      });
    }
  }

  convertMinMaxData(data: MinMax[]) { // converts the min/max data into a format that can be used by the chart
    this.data = [[], []];             // having an unspecfic data array and years array allows for the chart
    this.years = [];                  // to be reused for both min/max and median/avg
    data.forEach(e => {
      this.data[0].push(e.minbyyear);
      this.data[1].push(e.maxbyyear);
      this.years.push(e.year);
    });
    this.createChart();
  }

  convertMedAvgData(data: MedianAvg[]) { // converts the median/avg data into a format that can be used by the chart
    this.data = [[], []];
    this.years = [];
    data.forEach(e => {
      this.data[0].push(e.avg);
      this.data[1].push(e.median);
      this.years.push(e.year);
    });
    this.createChart();
  }

  createChart() {
    this.options = {
      legend: { // legend is the top part that shows the colors of the lines
        data: [(this.view === 0 ? 'Min Weight' : 'Average Weight'), (this.view === 0 ? 'Max Weight' : 'Median Weight')] // changes the legend based on the view
      },
      tooltip: { // tooltip is the box that shows up when you hover over a point
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: { // shows the years on the x axis
        type: 'category',
        data: this.years,
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
          max: 300
        },
        {
          type: 'value',
          name: 'Weight',
          axisLabel: {
            formatter: '{value} lbs'
          },
          min: 0,
          max: 300
        }
      ],
      series: [ // the data that is shown on the graph
        {
          name: (this.view === 0 ? 'Min Weight' : 'Average Weight'), // changes the name based on the view
          data: this.data[0],
          type: 'line',
          yAxisIndex: 0
        },
        {
          name: (this.view === 0 ? 'Max Weight' : 'Median Weight'), // changes the name based on the view
          data: this.data[1],
          type: 'line',
          yAxisIndex: 1
        }
      ]
    }
  }
}
