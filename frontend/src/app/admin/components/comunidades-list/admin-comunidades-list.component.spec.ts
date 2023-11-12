import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComunidadesListComponent } from './admin-comunidades-list.component';

describe('ComunidadesListComponent', () => {
  let component: AdminComunidadesListComponent;
  let fixture: ComponentFixture<AdminComunidadesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComunidadesListComponent]
    });
    fixture = TestBed.createComponent(AdminComunidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
