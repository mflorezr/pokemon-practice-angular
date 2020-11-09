import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, map, mergeMap, tap, catchError } from 'rxjs/operators';
import { CurrentPokemonService } from 'src/app/services/current-pokemon/current-pokemon.service';
import { PokemonListService } from 'src/app/services/pokemon-list/pokemon-list.service';
import * as PokemonActions from '../actions/pokemon.actions'
import { selectFavorites, selectPokemonFeatures, selectPokemonList } from '../selectors/pokemon.selectors';
import { of } from 'rxjs';
import { DialogPokemonInfoComponent } from 'src/app/material/components/dialog-pokemon-info/dialog-pokemon-info.component';
import { FullAlertComponent } from 'src/app/material/components/full-alert/full-alert.component';
import { DialogPokemonComparationComponent } from 'src/app/material/components/dialog-pokemon-comparison/dialog-pokemon-comparation.component';


@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.getPokemonFromApi),
      mergeMap(() => this.listService.getAllPokemons()
        .pipe(
          map(pokemons => PokemonActions.loadPokemonList({
            pokemons: pokemons
              .map((pokemon) => {
                return {
                  name: pokemon.name,
                  url: pokemon.url,
                  id: parseInt(pokemon.url.substring(34, (pokemon.url.length) - 1))
                };
              })
          })
          ),
          catchError(() => of({ type: '[Pokemon API] Pokemon Loaded Error' }))
        ))
    ));

  showPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonList),
      mergeMap(() =>
        this.store.select(selectPokemonList)
          .pipe(
            first(),
            map(pokemonList =>
              PokemonActions.setPokemonsToShow({ pokemonsToShow: pokemonList })
            )
          )),
    ));

  loadSelectedPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.clickToShow),
      mergeMap((action) => this.store.select(selectPokemonFeatures)
        .pipe(
          first(),
          map(features => {
            if (features.filter(pokemon => pokemon.name == action.name).length > 0) {
              this.dialog.open(DialogPokemonInfoComponent,
                { panelClass: 'custom-dialog-container' });
              return PokemonActions.showPokemonDetails({
                pokemonSelected: features.filter(pokemon => pokemon.name == action.name)[0]
              });
            } else {
              return PokemonActions.getInfoToShow({ name: action.name })
            }
          }),
        )),
    ));

  getPokemonSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.getInfoToShow),
      mergeMap((action) => this.service.getPokemonFromApi(action.name)
        .pipe(
          map(pokemon => PokemonActions.showPokemonDetails({ pokemonSelected: pokemon })),
          tap(() => {
            this.dialog.open(DialogPokemonInfoComponent,
              { panelClass: 'custom-dialog-container' });
          }),
          catchError(() => of({ type: '[Pokemon API] Pokemon Features Loaded Error' }))
        )),
    ));

  activateComparation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.activeComparation),
      map((action) => PokemonActions.saveCardName({ pokemonName: action.pokemonName }))
    ));

  loadPokemonToCompare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.clickToCompare),
      mergeMap((action) => this.store.select(selectPokemonFeatures)
        .pipe(
          first(),
          map(features => {
            if (features.filter(pokemon => pokemon.name == action.name).length > 0) {
              this.dialog.open(DialogPokemonComparationComponent,
                { panelClass: 'custom-dialog-container' });
              return PokemonActions.comparePokemonTo({
                pokemonToCompare: features.filter(pokemon => pokemon.name == action.name)[0]
              });
            } else {
              return PokemonActions.getInfoToCompare({ name: action.name });
            }
          }),
        )),
    ));

  getPokemonToCompare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.getInfoToCompare),
      mergeMap((action) => this.service.getPokemonFromApi(action.name)
        .pipe(
          map(pokemon => PokemonActions.comparePokemonTo({ pokemonToCompare: pokemon })),
          tap(() => {
            this.dialog.open(DialogPokemonComparationComponent,
              { panelClass: 'custom-dialog-container' });
          }),
          catchError(() => of({ type: '[Pokemon API] Pokemon Features Loaded Error' }))
        )),
    ));

  lookForPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.lookFor),
      mergeMap((action) => this.store.select(selectPokemonList)
        .pipe(
          first(),
          map(pokemonList => {
            if (action.word.length > 0) {
              return PokemonActions.setPokemonsToShow({
                pokemonsToShow: pokemonList.filter(
                  pokemon => pokemon.name.startsWith(action.word)
                )
              });
            } else {
              return PokemonActions.setPokemonsToShow({
                pokemonsToShow: pokemonList
              });
            }
          })
        ))
    ));

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.favorite),
      mergeMap((action) => this.store.select(selectFavorites)
        .pipe(
          first(),
          map(
            favoritePokemons => {
              if (favoritePokemons.length < 5) {
                return PokemonActions.addToFavorite({ pokemonId: action.pokemonId });
              } else {
                this.dialog.open(FullAlertComponent);
                return ({ type: '[Pokemon Favorite] Pokemon Favorites Full Error' });
              }
            }
          )
        ))
    ));

  removeFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.unfavorite),
      mergeMap((action) => this.store.select(selectFavorites)
        .pipe(
          first(),
          map(
            favoritePokemons => {
              let item = [...favoritePokemons];
              item.splice(item.indexOf(action.pokemonId), 1);
              return PokemonActions.removeFavorite({
                favorites: item
              });
            }
          )
        ))
    ));

  constructor(
    private actions$: Actions,
    public dialog: MatDialog,
    private service: CurrentPokemonService,
    private store: Store,
    private listService: PokemonListService) { }
}