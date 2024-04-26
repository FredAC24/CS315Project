import { Component } from '@angular/core';
import { QueryService } from '../_services/query.service';
import { EChartsOption } from 'echarts';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, provideEcharts } from 'ngx-echarts';
import { AllTypesAvg, AvgYearly } from '../_models/twins.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-twins',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './twins.component.html',
  styleUrl: './twins.component.scss',
  providers: [provideEcharts()]
})
export class TwinsComponent {
  constructor(private queryService: QueryService) {}

  singlesAvg: number[] = [];
  twinsAvg: number[] = [];
  tripletsAvg: number[] = [];
  years: number[] = [];

  overallAvg: AllTypesAvg[] = [];

  options: EChartsOption;
  options2: EChartsOption;

  ngOnInit() {
    forkJoin([this.queryService.avg_weight_of_all_types(), this.queryService.avg_weight_singles_yearly(), this.queryService.avg_weight_twins_yearly(), this.queryService.avg_weight_triplets_yearly()]).subscribe(([overallAvg, singles, twins, triplets]) => {
      this.processData("single", singles);
      this.processData("twin", twins);
      this.processData("triplet", triplets);
      this.overallAvg = overallAvg;
      this.createChart();
    });
  }

  processData(type: string, data: AvgYearly[]) {
    data.forEach(avg_year => {
      if (this.years.findIndex((year) => year === avg_year.year) === -1) {
        this.years.push(avg_year.year);
      }
      if (type === "single") this.singlesAvg[this.years.findIndex((year) => year === avg_year.year)] = avg_year.average;
      else if (type === "twin") this.twinsAvg[this.years.findIndex((year) => year === avg_year.year)] = avg_year.average;
      else if (type === "triplet") this.tripletsAvg[this.years.findIndex((year) => year === avg_year.year)] = avg_year.average;
    });
  }

  createChart() { // creates the chart
    this.options = {
      title: {
        text: 'Average Weight of Twins Yearly'
      },
      legend: { // legend is the top part that shows the colors of the lines
        data: ['Singles', 'Twins', 'Triplets']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
      xAxis: { // shows the labels on the x axis
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
          max: 15
        }
      ],
      series: [ // the data that is shown on the graph
        {
          name: ('Singles'), // changes the name based on the view
          data: this.singlesAvg,
          type: 'line',
          yAxisIndex: 0,
          connectNulls: true
        },
        {
          name: ('Twins'), // changes the name based on the view
          data: this.twinsAvg,
          type: 'line',
          yAxisIndex: 0,
          connectNulls: true
        },
        {
          name: ('Triplets'), // changes the name based on the view
          data: this.tripletsAvg,
          type: 'line',
          yAxisIndex: 0,
          connectNulls: true
        }
      ]
    };

    this.options2 = {
      title: {
        text: 'Average Weight of Twins'
      },
      legend: { // legend is the top part that shows the colors of the lines
        data: ['Singles', 'Twins', 'Triplets']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
      xAxis: { // shows the labels on the x axis
        type: 'category',
        data: ['Average'],
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
          max: 10
        }
      ],
      series: [ // the data that is shown on the graph
        {
          name: ('Singles'), // changes the name based on the view
          data: [this.overallAvg[0].average],
          type: 'bar',
          yAxisIndex: 0
        },
        {
          name: ('Twins'), // changes the name based on the view
          data: [this.overallAvg[1].average],
          type: 'bar',
          yAxisIndex: 0
        },
        {
          name: ('Triplets'), // changes the name based on the view
          data: [this.overallAvg[2].average],
          type: 'bar',
          yAxisIndex: 0
        }
      ]
    };
  }
}
