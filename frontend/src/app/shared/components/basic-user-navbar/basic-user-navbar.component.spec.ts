import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicUserNavbarComponent } from './basic-user-navbar.component';

describe('BasicUserNavbarComponent', () => {
  let component: BasicUserNavbarComponent;
  let fixture: ComponentFixture<BasicUserNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicUserNavbarComponent]
    });
    fixture = TestBed.createComponent(BasicUserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
