import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioPartidosPageComponent } from './propietario-partidos-page.component';

describe('PropietarioPartidosPageComponent', () => {
  let component: PropietarioPartidosPageComponent;
  let fixture: ComponentFixture<PropietarioPartidosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioPartidosPageComponent]
    });
    fixture = TestBed.createComponent(PropietarioPartidosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
