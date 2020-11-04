import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pokemon-chart',
  templateUrl: './pokemon-chart.component.html',
  styleUrls: ['./pokemon-chart.component.css']
})
export class PokemonChartComponent implements OnInit {
  @Input() stats: Array<Array<Object>>;

  static _barChartOptions: ChartOptions;
  barChartLabels: Label[] = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  barChartData: ChartDataSets[]
  colors = ['#167a69', '#26b19c'];

  constructor() {
    PokemonChartComponent._barChartOptions = {
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
  }

  ngOnInit(): void {
    this.changeStats();
  }

  changeStats() {
    this.barChartData = this.stats.map((stat, index) => {
      return {
        data: stat.map(
          stat => stat["base_stat"]
        ),
        backgroundColor: this.colors[index % this.colors.length]
      };
    });
  }

  get barChartOptions() {
    return PokemonChartComponent._barChartOptions;
  }

}