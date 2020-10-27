import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { CurrentPokemonService } from 'src/app/services/current-pokemon/current-pokemon.service';
import { DialogPokemonComparationComponent } from 'src/app/material/dialog-pokemon-comparison/dialog-pokemon-comparation.component';
import { DialogPokemonInfoComponent } from 'src/app/material/dialog-pokemon-info/dialog-pokemon-info.component';
import { FullAlertComponent } from 'src/app/material/full-alert/full-alert.component';
import { PokemonListService } from 'src/app/services/pokemon-list/pokemon-list.service';
import * as PokemonActions from '../actions/pokemon.actions'
import { setPokemonsToShow } from '../actions/pokemon.actions';
import { selectFromStore } from '../selectors/pokemon.selectors';


@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.getPokemonFromApi),
      tap(
        () => {
          this.listService.getAllPokemons();
        })
    ), { dispatch: false });

  showPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonList),
      tap(
        () => {
          this.store.pipe(
            select(selectFromStore),
            first()
          ).subscribe(
            (state) => {
              this.store.dispatch(setPokemonsToShow({ pokemonsToShow: state.pokemonList }));
            }
          )
        })
    ), { dispatch: false });

  loadSelectedPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.selectPokemonCard),
      tap((action) => {
        this.service.loadSelectedPokemon(action.name);
      })
    ), { dispatch: false });

  openModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.showPokemonDetails),
      tap(
        () => {
          this.dialog.open(DialogPokemonInfoComponent,
            { panelClass: 'custom-dialog-container' });
        })
    ), { dispatch: false });

  activateComparation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.selectToCompare),
      tap(() => {
        this.service.setCompareTo();
      })
    ), { dispatch: false });

  openComparationModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.comparePokemonTo),
      tap(
        () => {
          this.dialog.open(DialogPokemonComparationComponent,
            { panelClass: 'custom-dialog-container' });
          this.service.setCompareTo();
        })
    ), { dispatch: false });

  lookForPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.lookFor),
      tap(
        (action) => {
          this.store.pipe(
            select(selectFromStore),
            first()
          ).subscribe(
            state => {
              if (action.word.length > 0) {
                this.store.dispatch(setPokemonsToShow({
                  pokemonsToShow: state.pokemonList.filter(
                    pokemon => pokemon.name.startsWith(action.word)
                  )
                }));
              } else {
                this.store.dispatch(setPokemonsToShow({
                  pokemonsToShow: state.pokemonList
                }));
              }
            }
          );
        })
    ), { dispatch: false });

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.favorite),
      tap(
        (action) => {
          this.store.pipe(
            select(selectFromStore),
            first()
          ).subscribe(
            (state) => {
              if (state.favoritePokemons.length < 5) {
                this.store.dispatch(PokemonActions.addToFavorite({ id: action.id }));
              } else {
                this.dialog.open(FullAlertComponent);
              }
            }
          )
        })
    ), { dispatch: false });

  removeFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.unfavorite),
      tap(
        (action) => {
          this.store.pipe(
            select(selectFromStore),
            first()
          ).subscribe(
            (state) => {
              if (state.favoritePokemons.includes(action.id)) {
                let item = [...state.favoritePokemons];
                item.splice(item.indexOf(action.id), 1);
                this.store.dispatch(PokemonActions.removeFavorite({
                  favorites: item
                }));
              }
            }
          )
        })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    public dialog: MatDialog,
    private service: CurrentPokemonService,
    private store: Store,
    private listService: PokemonListService) { }
}
