import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuarioListItemComponent } from './admin-usuario-list-item.component';

describe('UsuarioListItemComponent', () => {
  let component: AdminUsuarioListItemComponent;
  let fixture: ComponentFixture<AdminUsuarioListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsuarioListItemComponent]
    });
    fixture = TestBed.createComponent(AdminUsuarioListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
