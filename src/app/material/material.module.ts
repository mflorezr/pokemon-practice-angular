import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteModule } from '../favorite/favorite.module';
import { ChartModule } from '../chart/chart.module';
import { DialogPokemonComparationComponent } from './components/dialog-pokemon-comparison/dialog-pokemon-comparation.component';
import { DialogPokemonInfoComponent } from './components/dialog-pokemon-info/dialog-pokemon-info.component';
import { FullAlertComponent } from './components/full-alert/full-alert.component';

@NgModule({
  declarations: [
    DialogPokemonComparationComponent,
    DialogPokemonInfoComponent,
    FullAlertComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FavoriteModule,
    ChartModule
  ],
  exports: [
    DialogPokemonComparationComponent,
    DialogPokemonInfoComponent,
    FullAlertComponent,
  ]
})
export class MaterialModule { }