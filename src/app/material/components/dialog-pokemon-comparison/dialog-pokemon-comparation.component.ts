import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { saveCardName } from 'src/app/store/actions/pokemon.actions';
import { selectFromStore } from 'src/app/store/selectors/pokemon.selectors';

@Component({
  selector: 'app-dialog-pokemon-comparation',
  templateUrl: './dialog-pokemon-comparation.component.html',
  styleUrls: ['./dialog-pokemon-comparation.component.css']
})
export class DialogPokemonComparationComponent implements OnDestroy {
  firstPokemon: Pokemon;
  secondPokemon: Pokemon;
  pokemonsSubscription: Subscription;

  constructor(private store: Store) {
    this.pokemonsSubscription = this.store.pipe(
      select(selectFromStore))
      .subscribe(state => {
        this.firstPokemon = state.pokemonSelected;
        this.secondPokemon = state.pokemonToCompare;
      });
    this.store.dispatch(saveCardName({ pokemonName: undefined }));
  }

  ngOnDestroy(): void {
    this.pokemonsSubscription.unsubscribe();
  }

}