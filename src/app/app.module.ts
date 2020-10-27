import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { reducer } from './store/reducers/pokemon.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { PokemonChartComponent } from './components/pokemon-chart/pokemon-chart.component';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './store/effects/pokemon.effects';
import { ComparationCardComponent } from './components/comparation-card/comparation-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DialogPokemonInfoComponent } from './material/dialog-pokemon-info/dialog-pokemon-info.component';
import { DialogPokemonComparationComponent } from './material/dialog-pokemon-comparison/dialog-pokemon-comparation.component';
import { FullAlertComponent } from './material/full-alert/full-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    PokemonListComponent,
    PokemonCardComponent,
    ComparationCardComponent,
    DialogPokemonInfoComponent,
    PokemonChartComponent,
    DialogPokemonComparationComponent,
    FullAlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ reducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ChartsModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([PokemonEffects, ComparationCardComponent]),
    InfiniteScrollModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
