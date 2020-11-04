import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';

export const getPokemonFromApi = createAction(
  '[Pokemon Api] Get List',
);

export const loadPokemonList = createAction(
  '[Pokemon List] Save List',
  props<{ pokemons: Pokemon[] }>()
);

export const setPokemonsToShow = createAction(
  '[Pokemon List] Show Pokemons',
  props<{ pokemonsToShow: Pokemon[] }>()
);

export const clickToShow = createAction(
  '[Pokemon Card] Select to Show',
  props<{ name: string }>()
);

export const getInfoToShow = createAction(
  '[Pokemon Api] Get Info to Show',
  props<{ name: string }>()
);

export const getInfoToCompare = createAction(
  '[Pokemon Api] Get Info to Compare',
  props<{ name: string }>()
);

export const clickToCompare = createAction(
  '[Pokemon Card] Select to Compare',
  props<{ name: string }>()
);

export const savePokemon = createAction(
  '[Pokemon Info] Save',
  props<{ currentPokemon: Pokemon }>()
);

export const showPokemonDetails = createAction(
  '[Pokemon Card] Load Pokemon',
  props<{ pokemonSelected: Pokemon }>()
);

export const activeComparation = createAction(
  '[Info Dialog] Compare',
  props<{ pokemonName: string }>()
);

export const saveCardName = createAction(
  '[Comparation Card] Update',
  props<{ pokemonName: string }>()
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
  '[Favorite Icon] Add To Favorite',
  props<{ pokemonId: number }>()
);

export const addToFavorite = createAction(
  '[Store] Save Favorite',
  props<{ pokemonId: number }>()
);

export const unfavorite = createAction(
  '[Favorite Icon] No Favorite',
  props<{ pokemonId: number }>()
);

export const removeFavorite = createAction(
  '[Store] Remove Favorite',
  props<{ favorites: number[] }>()
);