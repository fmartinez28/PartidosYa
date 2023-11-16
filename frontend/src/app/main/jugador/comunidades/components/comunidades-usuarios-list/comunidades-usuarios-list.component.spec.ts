import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesUsuariosListComponent } from './comunidades-usuarios-list.component';

describe('ComunidadesUsuariosListComponent', () => {
  let component: ComunidadesUsuariosListComponent;
  let fixture: ComponentFixture<ComunidadesUsuariosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesUsuariosListComponent]
    });
    fixture = TestBed.createComponent(ComunidadesUsuariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
