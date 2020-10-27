import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PokemonInformationService } from '../pokemon-information/pokemon-information.service';
import { Pokemon } from '../../models/pokemon.model'
import { first, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { comparePokemonTo, savePokemon, showPokemonDetails } from 'src/app/store/actions/pokemon.actions';
import { selectFromStore } from 'src/app/store/selectors/pokemon.selectors';


@Injectable({
  providedIn: 'root'
})
export class CurrentPokemonService {
  compareTo: boolean;

  constructor(
    private info: PokemonInformationService,
    private store: Store
  ) {
    this.compareTo = false;
  }

  setCompareTo() {
    this.compareTo = !this.compareTo;
  }

  loadSelectedPokemon(name: string) {
    let pokemons: Pokemon[];
    this.store
      .pipe(
        select(selectFromStore),
        first()
      ).subscribe(state => {
        pokemons = state.pokemonFeatures.filter(pokemon => pokemon.name === name);
        if (pokemons.length === 0) {
          this.getPokemon(name)
            .subscribe(
              (pokemon) => {
                this.showOrCompare(pokemon);
              }
            );
        } else {
          this.showOrCompare(pokemons[0]);
        }
      });
  }

  showOrCompare(pokemon: Pokemon) {
    if (this.compareTo) {
      this.store.dispatch(comparePokemonTo({ pokemonToCompare: pokemon }));
    } else {
      this.store.dispatch(showPokemonDetails({ pokemonSelected: pokemon }));
    }
  }

  getPokemon(name: string): Observable<Pokemon> {
    let newPokemon: Pokemon;
    return combineLatest([this.info.getCurrentPokemon(name), this.info.getFeatures(name)])
      .pipe(
        map(([pokemon, features]) => {
          newPokemon =
          {
            id: pokemon['id'],
            name: pokemon['name'],
            image: pokemon['sprites'].front_default,
            description: features['flavor_text_entries'][1].flavor_text,
            height: pokemon['height'],
            weight: pokemon['weight'],
            gender: this.getGender(features['gender_rate']),
            types: pokemon['types'],
            abilities: pokemon['abilities'],
            stats: pokemon['stats'],
          };
          this.store.dispatch(savePokemon({ currentPokemon: newPokemon }));
          return newPokemon;
        })
      );
  }

  getGender(genderRate: any) {
    if (genderRate > 4) {
      return 'Female';
    } else if (genderRate === -1) {
      return 'Genderless';
    } else {
      return 'Male';
    }
  }

}
