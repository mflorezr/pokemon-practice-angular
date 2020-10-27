import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAlertComponent } from './full-alert.component';

describe('FullAlertComponent', () => {
  let component: FullAlertComponent;
  let fixture: ComponentFixture<FullAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
