import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioPartidosListComponent } from './propietario-partidos-list.component';

describe('PropietarioPartidosComponent', () => {
  let component: PropietarioPartidosListComponent;
  let fixture: ComponentFixture<PropietarioPartidosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioPartidosListComponent]
    });
    fixture = TestBed.createComponent(PropietarioPartidosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
