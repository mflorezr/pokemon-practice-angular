import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { favorite, unfavorite } from '../../../store/actions/pokemon.actions';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  @Input() isFavorite: boolean;
  @Input() pokemonId: string;
  constructor(private store: Store) { }

  onFavorite(event: Event) {
    event.stopPropagation();
    if (this.isFavorite) {
      this.store.dispatch(unfavorite({ pokemonId: parseInt(this.pokemonId) }));
    } else {
      this.store.dispatch(favorite({ pokemonId: parseInt(this.pokemonId) }));
    }
  }

}