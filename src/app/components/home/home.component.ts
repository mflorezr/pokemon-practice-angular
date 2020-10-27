import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectFromStore } from '../../store/selectors/pokemon.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  slides = [
  ];

  slideConfig = {
    "centerMode": true,
    "centerPadding": "80px",
    "arrows": true,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 1500,
    "pauseOnFocus": false,
    "pauseOnHover": false
  };

  constructor(private store: Store) {
    this.store.pipe(
      select(selectFromStore)
    ).subscribe(
      state => {
        state.favoritePokemons.map(
          pokemonId => {
            this.slides.push({ img: this.url + pokemonId + '.png' });
          }
        )
      });
  }

  ngOnInit(): void {
  }

}
