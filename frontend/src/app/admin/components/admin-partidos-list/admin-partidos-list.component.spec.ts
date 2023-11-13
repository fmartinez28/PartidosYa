import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartidosListComponent } from './admin-partidos-list.component';

describe('PartidosListComponent', () => {
  let component: AdminPartidosListComponent;
  let fixture: ComponentFixture<AdminPartidosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPartidosListComponent]
    });
    fixture = TestBed.createComponent(AdminPartidosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
