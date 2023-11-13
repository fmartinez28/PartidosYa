import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuariosListComponent } from './admin-usuarios-list.component';

describe('UsuariosListComponent', () => {
  let component: AdminUsuariosListComponent;
  let fixture: ComponentFixture<AdminUsuariosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsuariosListComponent]
    });
    fixture = TestBed.createComponent(AdminUsuariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
