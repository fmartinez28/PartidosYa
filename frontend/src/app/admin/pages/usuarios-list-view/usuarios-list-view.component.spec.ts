import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosListViewComponent } from './usuarios-list-view.component';

describe('UsuariosListViewComponent', () => {
  let component: UsuariosListViewComponent;
  let fixture: ComponentFixture<UsuariosListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosListViewComponent]
    });
    fixture = TestBed.createComponent(UsuariosListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
