import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCardName } from '../../../store/selectors/pokemon.selectors';

@Component({
  selector: 'app-comparation-card',
  templateUrl: './comparation-card.component.html',
  styleUrls: ['./comparation-card.component.css']
})
export class ComparationCardComponent implements OnDestroy {
  show: boolean;
  pokemonName: string;
  pokemonNameSubscription: Subscription;

  constructor(private store: Store) {
    this.show = true;
    this.pokemonNameSubscription = this.store.select(selectCardName)
      .subscribe(
        cardName => {
          this.pokemonName = cardName;
          this.show = !this.show;
        }
      );
  }

  ngOnDestroy(): void {
    this.pokemonNameSubscription.unsubscribe();
  }
}