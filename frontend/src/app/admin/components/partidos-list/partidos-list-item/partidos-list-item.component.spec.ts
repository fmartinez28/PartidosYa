import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosListItemComponent } from './partidos-list-item.component';

describe('PartidosListItemComponent', () => {
  let component: PartidosListItemComponent;
  let fixture: ComponentFixture<PartidosListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosListItemComponent]
    });
    fixture = TestBed.createComponent(PartidosListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
