import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { clickToCompare, clickToShow } from '../../../store/actions/pokemon.actions';
import { AppState } from '../../../store/reducers/pokemon.reducer';
import { selectCardName, selectFavorites } from '../../../store/selectors/pokemon.selectors';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  @Input() pokemon: Pokemon;
  @Input() pokemonImage: string;
  isFavorite: boolean;
  favoriteSubscription: Subscription;
  compare: boolean;
  compareSubscription: Subscription;

  constructor(private store: Store<AppState>, public dialog: MatDialog,) {
    this.compare = false;
  }

  ngOnInit(): void {
    this.favoriteSubscription = this.store.pipe(
      select(selectFavorites))
      .subscribe(
        favoritePokemons => {
          if (favoritePokemons.includes(this.pokemon.id)) {
            this.isFavorite = true;
          } else {
            this.isFavorite = false;
          }
        }
      );

    this.compareSubscription = this.store.pipe(
      select(selectCardName))
      .subscribe(
        cardname => {
          if (cardname !== undefined) {
            this.compare = true;
          } else {
            this.compare = false;
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
    this.compareSubscription.unsubscribe();
  }

  clickPokemon(pokemon: Pokemon) {
    if (this.compare) {
      this.store.dispatch(clickToCompare({ name: pokemon.name }));
    } else {
      this.store.dispatch(clickToShow({ name: pokemon.name }));
    }
  }
}