import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorSidebarComponent } from './jugador-sidebar.component';

describe('JugadorSidebarComponent', () => {
  let component: JugadorSidebarComponent;
  let fixture: ComponentFixture<JugadorSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JugadorSidebarComponent]
    });
    fixture = TestBed.createComponent(JugadorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
