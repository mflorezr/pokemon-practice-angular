import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemonReducer from '../reducers/pokemon.reducer';

export const selectFeatures = createFeatureSelector<fromPokemonReducer.AppState>(
  fromPokemonReducer.pokemonFeatureKey,
);

export const selectFromStore = createSelector(
  selectFeatures,
  (state: fromPokemonReducer.AppState) => state
);