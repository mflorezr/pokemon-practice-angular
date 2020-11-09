import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
import { ApiHttpConnection } from '../../api-http-connection.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonInformationService {
  private pokemonUrl = environment.pokemonUrl;
  private pokemonFeatures = environment.pokemonSpecieUrl;

  constructor(private http: ApiHttpConnection) { }

  getCurrentPokemon(name: string): Observable<Pokemon> {
    return this.http.getAll(this.pokemonUrl + name).pipe(
      map(pokemon => {
        return pokemon as Pokemon
      })
    );
  }

  getFeatures(name: string): Observable<Pokemon> {
    return this.http.getAll(this.pokemonFeatures + name).pipe(
      map(pokemon => {
        return pokemon as Pokemon
      })
    );
  }

}