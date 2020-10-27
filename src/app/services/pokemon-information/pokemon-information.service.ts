import { Injectable } from '@angular/core';
import { HttpApiService } from '../../http-api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonInformationService {
  private pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
  private pokemonFeatures = "https://pokeapi.co/api/v2/pokemon-species/";

  constructor(private http: HttpApiService) { }

  getCurrentPokemon(name: string) {
    return this.http.getAll(this.pokemonUrl + name);
  }

  getFeatures(name: string) {
    return this.http.getAll(this.pokemonFeatures + name);
  }

}
