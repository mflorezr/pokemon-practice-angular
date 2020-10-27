import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pokemon-chart',
  templateUrl: './pokemon-chart.component.html',
  styleUrls: ['./pokemon-chart.component.css']
})
export class PokemonChartComponent implements OnChanges {
  @Input() stats: any;

  public barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Stats',
      fontSize: 17
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 25,
          padding: 5,
        },
        gridLines: {
          display: true,
          drawOnChartArea: false,
          color: 'rgb(0, 0, 0)',
          tickMarkLength: 3
        },
      }],
      xAxes: [{
        ticks: {
          padding: 5
        },
        gridLines: {
          display: true,
          drawOnChartArea: false,
          color: 'rgb(0, 0, 0)',
          offsetGridLines: false,
          tickMarkLength: 5
        },
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[]
  public colors = ['#167a69', '#26b19c'];

  constructor() {
  }

  ngOnChanges() {
    this.barChartData = this.stats.map((stats, index) => {
      return {
        data: stats.map(
          stat => stat.base_stat
        ),
        backgroundColor: this.colors[index % this.colors.length]
      };
    });
  }

}
