import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { ComparationCardComponent } from './components/comparation-card/comparation-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FavoriteModule } from '../favorite/favorite.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavBarComponent,
    PokemonListComponent,
    PokemonCardComponent,
    ComparationCardComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    InfiniteScrollModule,
    FavoriteModule,
  ],
  exports: [
    NavBarComponent,
    PokemonListComponent,
    PokemonCardComponent,
    ComparationCardComponent,
  ]
})
export class PokemonModule { }