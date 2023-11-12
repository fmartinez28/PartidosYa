import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComunidadesListItemComponent } from './admin-comunidades-list-item.component';

describe('ComunidadesListItemComponent', () => {
  let component: AdminComunidadesListItemComponent;
  let fixture: ComponentFixture<AdminComunidadesListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComunidadesListItemComponent]
    });
    fixture = TestBed.createComponent(AdminComunidadesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
