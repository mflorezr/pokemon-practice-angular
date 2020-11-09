import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemonReducer from '../reducers/pokemon.reducer';

export const selectFeatures = createFeatureSelector<fromPokemonReducer.AppState>(
  fromPokemonReducer.pokemonFeatureKey,
);

export const selectFromStore = createSelector(
  selectFeatures,
  (state: fromPokemonReducer.AppState) => state
);

export const selectPokemonList = createSelector(
  selectFeatures,
  (state: fromPokemonReducer.AppState) => state.pokemonList
);

export const selectPokemonFeatures = createSelector(
  selectFeatures,
  (state: fromPokemonReducer.AppState) => state.pokemonFeatures
);

export const selectFavorites = createSelector(
  selectFeatures,
  (state: fromPokemonReducer.AppState) => state.favoritePokemons
);

export const selectCardName = createSelector(
  selectFeatures,
  (state: fromPokemonReducer.AppState) => state.pokemonCardName
);