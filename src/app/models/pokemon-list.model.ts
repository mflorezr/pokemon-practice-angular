import { Pokemon } from './pokemon.model';

export interface PokemonList {
  next: string,
  results: Pokemon[]
}