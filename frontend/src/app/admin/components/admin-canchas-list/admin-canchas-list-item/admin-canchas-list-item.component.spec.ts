import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCanchasListItemComponent } from './admin-canchas-list-item.component';

describe('CanchasListItemComponent', () => {
  let component: AdminCanchasListItemComponent;
  let fixture: ComponentFixture<AdminCanchasListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCanchasListItemComponent]
    });
    fixture = TestBed.createComponent(AdminCanchasListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
