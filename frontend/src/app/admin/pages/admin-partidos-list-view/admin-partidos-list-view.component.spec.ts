import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartidosListViewComponent } from './admin-partidos-list-view.component';

describe('PartidosListViewComponent', () => {
  let component: AdminPartidosListViewComponent;
  let fixture: ComponentFixture<AdminPartidosListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPartidosListViewComponent]
    });
    fixture = TestBed.createComponent(AdminPartidosListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
