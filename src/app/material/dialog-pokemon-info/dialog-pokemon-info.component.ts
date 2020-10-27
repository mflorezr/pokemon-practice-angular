import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { startWith } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
import { favorite, selectToCompare, unfavorite } from 'src/app/store/actions/pokemon.actions';
import { selectFromStore } from 'src/app/store/selectors/pokemon.selectors';

@Component({
  selector: 'app-dialog-pokemon-info',
  templateUrl: './dialog-pokemon-info.component.html',
  styleUrls: ['./dialog-pokemon-info.component.css']
})
export class DialogPokemonInfoComponent implements OnInit {
  currentPokemon: Pokemon;
  isFavorite: boolean;

  constructor(private store: Store) {
    this.store.pipe(
      select(selectFromStore)
    ).subscribe(state => {
      this.currentPokemon = state.pokemonSelected;
      if (state.favoritePokemons.includes(state.pokemonSelected.id)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    });
  }

  ngOnInit(): void {

  }

  onCompareTo() {
    this.store.dispatch(selectToCompare());
  }

  onFavorite() {
    if (this.isFavorite) {
      this.store.dispatch(unfavorite({ id: this.currentPokemon.id }));
    } else {
      this.store.dispatch(favorite({ id: this.currentPokemon.id }));
    }
  }
}
