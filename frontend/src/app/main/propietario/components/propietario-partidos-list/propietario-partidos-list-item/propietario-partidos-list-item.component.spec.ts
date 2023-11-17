import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioPartidosListItemComponent } from './propietario-partidos-list-item.component';

describe('PropietarioPartidosListItemComponent', () => {
  let component: PropietarioPartidosListItemComponent;
  let fixture: ComponentFixture<PropietarioPartidosListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioPartidosListItemComponent]
    });
    fixture = TestBed.createComponent(PropietarioPartidosListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
