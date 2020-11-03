import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiHttpConnection } from '../../api-http-connection.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private url = environment.pokemonListUrl;

  constructor(private httpService: ApiHttpConnection, private store: Store) { }

  getAllPokemons(): Observable<Object> {
    return this.httpService.getAll(this.url)
      .pipe(
        tap(pokemonList => {
          this.setUrl(pokemonList['next']);
        })
      );
  }

  setUrl(nextUrl: string) {
    this.url = nextUrl;
  }
}