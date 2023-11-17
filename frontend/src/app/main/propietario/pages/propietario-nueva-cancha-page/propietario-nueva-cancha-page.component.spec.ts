import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioNuevaCanchaPageComponent } from './propietario-nueva-cancha-page.component';

describe('PropietarioNuevaCanchaPageComponent', () => {
  let component: PropietarioNuevaCanchaPageComponent;
  let fixture: ComponentFixture<PropietarioNuevaCanchaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioNuevaCanchaPageComponent]
    });
    fixture = TestBed.createComponent(PropietarioNuevaCanchaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
