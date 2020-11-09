import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteComponent } from './components/favorite/favorite.component';

@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    FavoriteComponent
  ]
})
export class FavoriteModule { }