import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';

export const getPokemonFromApi = createAction(
  '[Pokemon List] Get List',
);

export const loadPokemonList = createAction(
  '[Pokemon List] Save List',
  props<{ pokemons: any[] }>()
);

export const setPokemonsToShow = createAction(
  '[Pokemon List] Show Pokemons',
  props<{ pokemonsToShow: any[] }>()
);

export const selectPokemonCard = createAction(
  '[Pokemon Card] Select',
  props<{ name: string }>()
);

export const savePokemon = createAction(
  '[Pokemon Features] Save',
  props<{ currentPokemon: Pokemon }>()
);

export const showPokemonDetails = createAction(
  '[Pokemon Card] Load Pokemon',
  props<{ pokemonSelected: Pokemon }>()
);

export const selectToCompare = createAction(
  '[Info Dialog] Compare'
);

export const comparePokemonTo = createAction(
  '[Pokemon Card] Load Comparation',
  props<{ pokemonToCompare: Pokemon }>()
);

export const lookFor = createAction(
  '[Search Box] New Input',
  props<{ word: string }>()
);

export const favorite = createAction(
  '[Pokemon Card] Add To Favorite',
  props<{ id: number }>()
);

export const addToFavorite = createAction(
  '[Store] Save Favorite',
  props<{ id: number }>()
);

export const unfavorite = createAction(
  '[Pokemon Card] No Favorite',
  props<{ id: number }>()
);

export const removeFavorite = createAction(
  '[Store] Remove Favorite',
  props<{ favorites: number[] }>()
);