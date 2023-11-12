import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListItemComponent } from './usuario-list-item.component';

describe('UsuarioListItemComponent', () => {
  let component: UsuarioListItemComponent;
  let fixture: ComponentFixture<UsuarioListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioListItemComponent]
    });
    fixture = TestBed.createComponent(UsuarioListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
