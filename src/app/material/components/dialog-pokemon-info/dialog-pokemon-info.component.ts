import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { activeComparation } from 'src/app/store/actions/pokemon.actions';
import { selectFromStore } from 'src/app/store/selectors/pokemon.selectors';

@Component({
  selector: 'app-dialog-pokemon-info',
  templateUrl: './dialog-pokemon-info.component.html',
  styleUrls: ['./dialog-pokemon-info.component.css']
})
export class DialogPokemonInfoComponent implements OnDestroy {
  currentPokemon: Pokemon;
  isFavorite: boolean;
  currentPokemonSubscription: Subscription;

  constructor(private store: Store) {
    this.currentPokemonSubscription = this.store.pipe(
      select(selectFromStore))
      .subscribe(state => {
        this.currentPokemon = state.pokemonSelected;
        if (this.currentPokemon && state.favoritePokemons.includes(state.pokemonSelected.id)) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.currentPokemonSubscription.unsubscribe();
  }

  onCompareTo() {
    this.store.dispatch(activeComparation({ pokemonName: this.currentPokemon.name }));
  }
}