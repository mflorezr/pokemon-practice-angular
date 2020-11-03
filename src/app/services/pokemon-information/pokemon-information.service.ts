import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiHttpConnection } from '../../api-http-connection.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonInformationService {
  private pokemonUrl = environment.pokemonUrl;
  private pokemonFeatures = environment.pokemonSpecieUrl;

  constructor(private http: ApiHttpConnection) { }

  getCurrentPokemon(name: string) {
    return this.http.getAll(this.pokemonUrl + name);
  }

  getFeatures(name: string) {
    return this.http.getAll(this.pokemonFeatures + name);
  }

}