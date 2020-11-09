import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectFromStore } from '../../../store/selectors/pokemon.selectors';
import { getPokemonFromApi } from '../../../store/actions/pokemon.actions';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnDestroy {
  pokemons: Pokemon[];
  imgSrc = environment.pokemonImageUrl;
  pokemonsToShowSubscription: Subscription;

  constructor(private store: Store) {
    this.pokemonsToShowSubscription = this.store
      .pipe(
        select(selectFromStore))
      .subscribe(
        state => {
          this.pokemons = state.pokemonsToShow;
        }
      );
  }

  ngOnDestroy(): void {
    this.pokemonsToShowSubscription.unsubscribe();
  }

  onScrollDown() {
    this.store.dispatch(getPokemonFromApi());
  }

}