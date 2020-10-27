import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { HttpApiService } from '../../http-api.service';
import { loadPokemonList, setPokemonsToShow } from '../../store/actions/pokemon.actions';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';

  constructor(private httpService: HttpApiService, private store: Store) { }

  getAllPokemons() {
    this.httpService.getAll(this.url).
      pipe(
        tap(pokemons => {
          this.store.dispatch(loadPokemonList({ pokemons: pokemons['results'] }));
          this.setUrl(pokemons['next']);
        })
      )
      .subscribe();
  }

  setUrl(nextUrl: string) {
    this.url = nextUrl;
  }
}
