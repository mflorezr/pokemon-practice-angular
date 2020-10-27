import { Component, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectFromStore } from '../../store/selectors/pokemon.selectors';
import { getPokemonFromApi } from '../../store/actions/pokemon.actions';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[];
  imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getPokemonFromApi());
    this.store
      .pipe(
        select(selectFromStore)
      ).subscribe(
        state => {
          this.pokemons = state.pokemonsToShow;
        }
      );
  }

  onScrollDown() {
    this.store.dispatch(getPokemonFromApi());
  }

}
