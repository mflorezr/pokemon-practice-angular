import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HomeComponent } from './components/home.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    IvyCarouselModule,
    AppRoutingModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }