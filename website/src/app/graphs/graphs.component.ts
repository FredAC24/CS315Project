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
    this.queryService.min_max_weight_yearly().subscribe((data) => {
      data.pop();
      this.convertMinMaxData(data);
    });
  }

  setView(view: number) {
    this.view = view;
    if (view === 0) {
      this.queryService.min_max_weight_yearly().subscribe((data) => {
        data.pop();
        this.convertMinMaxData(data);
      });
    } else if (view === 1) {
      this.queryService.median_avg_weight_yearly().subscribe((data) => {
        data.pop();
        this.convertAvgData(data);
      });
    }
  }

  convertMinMaxData(data: MinMax[]) {
    this.data = [[], []];
    this.years = [];
    data.forEach(e => {
      this.data[0].push(e.minbyyear);
      this.data[1].push(e.maxbyyear);
      this.years.push(e.year);
    });
    this.createMinMaxChart();
  }

  createMinMaxChart() {
    this.options = {
      legend: {
        data: ['Min Weight', 'Max Weight']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'category',
        data: this.years,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: [
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
      series: [
        {
          name: 'Min Weight',
          data: this.data[0],
          type: 'line',
          yAxisIndex: 0
        },
        {
          name: 'Max Weight',
          data: this.data[1],
          type: 'line',
          yAxisIndex: 1
        }
      ]
    }
  }

  convertAvgData(data: MedianAvg[]) {
    this.data = [[], []];
    this.years = [];
    data.forEach(e => {
      this.data[0].push(e.median);
      this.data[1].push(e.avg);
      this.years.push(e.year);
    });
    this.createAvgChart();
  }

  createAvgChart() {
    this.options = {
      legend: {
        data: ['Average Weight', 'Median Weight']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'category',
        data: this.years,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: [
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
      series: [
        {
          name: 'Average Weight',
          data: this.data[0],
          type: 'line',
          yAxisIndex: 0
        },
        {
          name: 'Median Weight',
          data: this.data[1],
          type: 'line',
          yAxisIndex: 1
        }
      ]
    }
  }
}
