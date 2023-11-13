import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartidosListItemComponent } from './admin-partidos-list-item.component';

describe('PartidosListItemComponent', () => {
  let component: AdminPartidosListItemComponent;
  let fixture: ComponentFixture<AdminPartidosListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPartidosListItemComponent]
    });
    fixture = TestBed.createComponent(AdminPartidosListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
