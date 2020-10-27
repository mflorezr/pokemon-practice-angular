import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';
import { selectFromStore } from 'src/app/store/selectors/pokemon.selectors';

@Component({
  selector: 'app-dialog-pokemon-comparation',
  templateUrl: './dialog-pokemon-comparation.component.html',
  styleUrls: ['./dialog-pokemon-comparation.component.css']
})
export class DialogPokemonComparationComponent implements OnInit {
  firstPokemon: Pokemon;
  secondPokemon: Pokemon;

  constructor(private store: Store) {
    this.store.pipe(
      select(selectFromStore)
    ).subscribe(state => {
      this.firstPokemon = state.pokemonSelected;
      this.secondPokemon = state.pokemonToCompare;
    });
  }

  ngOnInit(): void {
  }

}
