import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPokemonComparationComponent } from './dialog-pokemon-comparation.component';

describe('DialogPokemonComparationComponent', () => {
  let component: DialogPokemonComparationComponent;
  let fixture: ComponentFixture<DialogPokemonComparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPokemonComparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPokemonComparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
