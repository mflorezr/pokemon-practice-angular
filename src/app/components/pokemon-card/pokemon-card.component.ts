import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { favorite, selectPokemonCard, unfavorite } from '../../store/actions/pokemon.actions';
import { AppState } from '../../store/reducers/pokemon.reducer';
import { selectFromStore } from '../../store/selectors/pokemon.selectors';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: any;
  @Input() pokemonImage: any;
  isFavorite: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(selectFromStore)
    ).subscribe(
      state => {
        let id = this.pokemon.url.substring(34, this.pokemon.url.length - 1);
        if (state.favoritePokemons.includes(parseInt(id))) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      }
    );
  }

  onClickPokemon(pokemon: any) {
    this.store.dispatch(selectPokemonCard({ name: pokemon.name }));
  }

  onFavorite(event) {
    event.stopPropagation();
    let id = parseInt(this.pokemon.url.substring(34, this.pokemon.url.length - 1));
    if (this.isFavorite) {
      this.store.dispatch(unfavorite({ id: id }));
    } else {
      this.store.dispatch(favorite({ id: id }));
    }
  }
}
