import { Component } from '@angular/core';
import { QueryService } from '../_services/query.service';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { AvgParentWeight } from '../_models/avg_parent_weight.model';

@Component({
  selector: 'app-dams',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './dams.component.html',
  styleUrl: './dams.component.scss',
  providers: [provideEcharts()]
})
export class DamsComponent {
  constructor(private queryService: QueryService) { }

  options: EChartsOption;
  data: [number[], number[]];

  ngOnInit() {
    this.options = {};
    this.queryService.avg_weight_of_parent_yearly().subscribe((data) => {
      this.convertData(data);
      this.createChart();
    });
  }

  convertData(data: AvgParentWeight[]) {
    this.data = [[], []];
    data.forEach(e => {
      this.data[0].push(e.average_weight_of_female_dam);
      this.data[1].push(e.birth_year);
    });
    console.log(this.data);
  }

  createChart() {
    this.options = {
      legend: { // legend is the top part that shows the colors of the lines
        data: ['Average Weight']
      },
      tooltip: { // tooltip is the box that shows up when you hover over a point
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: { // shows the years on the x axis
        type: 'category',
        data: this.data[1],
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
        }
      ],
      series: [ // the data that is shown on the graph
        {
          name: ('Average Weight'), // changes the name based on the view
          data: this.data[0],
          type: 'line',
          yAxisIndex: 0
        }
      ]
    };
  }
}
