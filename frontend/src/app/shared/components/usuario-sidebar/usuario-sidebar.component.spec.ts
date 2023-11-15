import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSidebarComponent } from './usuario-sidebar.component';

describe('JugadorSidebarComponent', () => {
  let component: UsuarioSidebarComponent;
  let fixture: ComponentFixture<UsuarioSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioSidebarComponent]
    });
    fixture = TestBed.createComponent(UsuarioSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
