import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonInformationService } from '../pokemon-information/pokemon-information.service';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { savePokemon } from 'src/app/store/actions/pokemon.actions';
import { Pokemon } from 'src/app/models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class CurrentPokemonService {

  constructor(
    private info: PokemonInformationService,
    private store: Store
  ) {
  }

  getPokemonFromApi(name: string): Observable<Pokemon> {
    let newPokemon: Pokemon;
    return combineLatest([this.info.getCurrentPokemon(name), this.info.getFeatures(name)])
      .pipe(
        map(([pokemon, features]) => {
          newPokemon =
          {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon['sprites'].front_default,
            description: features['flavor_text_entries'][1].flavor_text,
            height: pokemon.height,
            weight: pokemon.weight,
            gender: this.getGender(features['gender_rate']),
            types: pokemon.types,
            abilities: pokemon.abilities,
            stats: pokemon.stats,
          };
          this.store.dispatch(savePokemon({ currentPokemon: newPokemon }));
          return newPokemon;
        })
      );
  }

  getGender(genderRate: number): string {
    if (genderRate > 4) {
      return 'Female';
    } else if (genderRate === -1) {
      return 'Genderless';
    } else {
      return 'Male';
    }
  }

}