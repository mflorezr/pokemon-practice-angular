import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectFavorites } from '../../store/selectors/pokemon.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  private url = environment.pokemonImageUrl;
  favoritesSubscription: Subscription;
  slides = [];

  constructor(private store: Store) {
    this.favoritesSubscription = this.store.pipe(
      select(selectFavorites))
      .subscribe(
        favoritePokemons => {
          this.slides = favoritePokemons.map(
            pokemonId => {
              return { path: this.url + pokemonId + '.png' };
            }
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }

}