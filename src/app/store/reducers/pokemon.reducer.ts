import { createReducer, on } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';
import * as PokemonActions from '../actions/pokemon.actions'


export const pokemonFeatureKey = 'reducer';

export interface AppState {
  pokemonList: Pokemon[],
  pokemonFeatures: Pokemon[],
  pokemonSelected: Pokemon,
  pokemonCardName: string,
  pokemonToCompare: Pokemon,
  pokemonsToShow: Pokemon[],
  favoritePokemons: number[]
}

export const initialState: AppState = {
  pokemonList: [],
  pokemonFeatures: [],
  pokemonSelected: undefined,
  pokemonCardName: undefined,
  pokemonToCompare: undefined,
  pokemonsToShow: [],
  favoritePokemons: [1, 2, 3]
};


export const reducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemonList, (state, action) => {
    return {
      ...state,
      pokemonList: [...state.pokemonList, ...action.pokemons]
    }
  }),
  on(PokemonActions.savePokemon, (state, action) => {
    return {
      ...state,
      pokemonFeatures: [...state.pokemonFeatures, action.currentPokemon]
    }
  }),
  on(PokemonActions.showPokemonDetails, (state, action) => {
    return {
      ...state,
      pokemonSelected: action.pokemonSelected
    }
  }),
  on(PokemonActions.saveCardName, (state, action) => {
    return {
      ...state,
      pokemonCardName: action.pokemonName
    }
  }),
  on(PokemonActions.comparePokemonTo, (state, action) => {
    return {
      ...state,
      pokemonToCompare: action.pokemonToCompare
    }
  }),
  on(PokemonActions.setPokemonsToShow, (state, action) => {
    return {
      ...state,
      pokemonsToShow: action.pokemonsToShow
    }
  }),
  on(PokemonActions.addToFavorite, (state, action) => {
    return {
      ...state,
      favoritePokemons: [...state.favoritePokemons, action.pokemonId]
    }
  }),
  on(PokemonActions.removeFavorite, (state, action) => {
    return {
      ...state,
      favoritePokemons: action.favorites
    }
  })
);