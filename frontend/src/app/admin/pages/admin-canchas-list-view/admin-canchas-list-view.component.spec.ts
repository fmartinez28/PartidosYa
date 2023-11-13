import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCanchasListViewComponent } from './admin-canchas-list-view.component';

describe('AdminCanchasListViewComponent', () => {
  let component: AdminCanchasListViewComponent;
  let fixture: ComponentFixture<AdminCanchasListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCanchasListViewComponent]
    });
    fixture = TestBed.createComponent(AdminCanchasListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
