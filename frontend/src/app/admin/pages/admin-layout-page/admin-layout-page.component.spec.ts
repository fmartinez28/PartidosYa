import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutPageComponent } from './admin-layout-page.component';

describe('AdminLayoutPageComponent', () => {
  let component: AdminLayoutPageComponent;
  let fixture: ComponentFixture<AdminLayoutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLayoutPageComponent]
    });
    fixture = TestBed.createComponent(AdminLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
