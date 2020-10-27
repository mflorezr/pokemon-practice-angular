import { Component, OnInit } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Pokemon } from '../../models/pokemon.model';
import * as PokemonActions from '../../store/actions/pokemon.actions'
import { selectFromStore } from '../../store/selectors/pokemon.selectors';

@Component({
  selector: 'app-comparation-card',
  templateUrl: './comparation-card.component.html',
  styleUrls: ['./comparation-card.component.css']
})
export class ComparationCardComponent implements OnInit {
  show: boolean;
  pokemon: Pokemon;

  constructor(private store: Store, private actions$: Actions) {
    this.store.pipe(
      select(selectFromStore)
    ).subscribe(
      state => { this.pokemon = state.pokemonSelected; }
    );
  }

  ngOnInit(): void {
  }

  openCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.selectToCompare),
      tap(
        () => {
          this.show = true;
        })
    ), { dispatch: false }).subscribe();

  closeCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.selectPokemonCard),
      tap(() => {
        this.show = false;
      })
    ), { dispatch: false }).subscribe();

}
