import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPageComponent } from './session-page.component';

describe('SessionPageComponent', () => {
  let component: SessionPageComponent;
  let fixture: ComponentFixture<SessionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionPageComponent]
    });
    fixture = TestBed.createComponent(SessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
