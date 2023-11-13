import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCanchasListComponent } from './admin-canchas-list.component';

describe('CanchasListComponent', () => {
  let component: AdminCanchasListComponent;
  let fixture: ComponentFixture<AdminCanchasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCanchasListComponent]
    });
    fixture = TestBed.createComponent(AdminCanchasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
