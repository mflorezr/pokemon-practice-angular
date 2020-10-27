import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { lookFor } from '../../store/actions/pokemon.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onKeyInput(value: string) {
    this.store.dispatch(lookFor({ word: value }));
  }
}
