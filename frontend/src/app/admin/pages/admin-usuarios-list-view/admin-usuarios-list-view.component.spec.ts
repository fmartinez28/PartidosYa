import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuariosListViewComponent } from './admin-usuarios-list-view.component';

describe('UsuariosListViewComponent', () => {
  let component: AdminUsuariosListViewComponent;
  let fixture: ComponentFixture<AdminUsuariosListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsuariosListViewComponent]
    });
    fixture = TestBed.createComponent(AdminUsuariosListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
