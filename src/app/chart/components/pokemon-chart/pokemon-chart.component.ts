import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Stat } from 'src/app/models/pokemon.model';
import { BAR_CHART_OPTIONS } from './pokemon-chart.constants'

@Component({
  selector: 'app-pokemon-chart',
  templateUrl: './pokemon-chart.component.html',
  styleUrls: ['./pokemon-chart.component.css']
})
export class PokemonChartComponent implements OnInit {
  @Input() stats: Array<Array<Stat>>;

  static _barChartOptions: ChartOptions = BAR_CHART_OPTIONS;
  barChartLabels: Label[] = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  barChartData: ChartDataSets[]
  colors = ['#167a69', '#26b19c'];

  constructor() {
  }

  ngOnInit(): void {
    this.changeStats();
  }

  changeStats() {
    this.barChartData = this.stats.map((stat, index) => {
      return {
        data: stat.map(
          stat => stat.base_stat
        ),
        backgroundColor: this.colors[index % this.colors.length]
      };
    });
  }

  get barChartOptions() {
    return PokemonChartComponent._barChartOptions;
  }

}