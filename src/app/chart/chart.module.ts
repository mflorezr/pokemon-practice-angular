import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { PokemonChartComponent } from './components/pokemon-chart/pokemon-chart.component';

@NgModule({
  declarations: [
    PokemonChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    PokemonChartComponent
  ]
})
export class ChartModule { }