import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPokemonFromApi } from './store/actions/pokemon.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(getPokemonFromApi());
  }

}