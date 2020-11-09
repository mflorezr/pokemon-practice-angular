import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PokemonList } from 'src/app/models/pokemon-list.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
import { ApiHttpConnection } from '../../api-http-connection.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private url = environment.pokemonListUrl;

  constructor(private httpService: ApiHttpConnection, private store: Store) { }

  getAllPokemons(): Observable<Pokemon[]> {
    return this.httpService.getAll(this.url)
      .pipe(
        tap((pokemonList: PokemonList) => {
          this.setUrl(pokemonList.next);
        }),
        map(pokemons => {
          return pokemons.results
        }),
      );
  }

  setUrl(nextUrl: string) {
    this.url = nextUrl;
  }
}