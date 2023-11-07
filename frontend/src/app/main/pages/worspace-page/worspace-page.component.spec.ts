import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorspacePageComponent } from './worspace-page.component';

describe('WorspacePageComponent', () => {
  let component: WorspacePageComponent;
  let fixture: ComponentFixture<WorspacePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorspacePageComponent]
    });
    fixture = TestBed.createComponent(WorspacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
