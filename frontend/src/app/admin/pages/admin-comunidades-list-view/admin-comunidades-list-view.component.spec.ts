import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComunidadesListViewComponent } from './admin-comunidades-list-view.component';

describe('ComunidadesListViewComponent', () => {
  let component: AdminComunidadesListViewComponent;
  let fixture: ComponentFixture<AdminComunidadesListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComunidadesListViewComponent]
    });
    fixture = TestBed.createComponent(AdminComunidadesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
