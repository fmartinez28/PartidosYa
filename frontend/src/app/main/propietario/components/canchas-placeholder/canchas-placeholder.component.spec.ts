import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchasPlaceholderComponent } from './canchas-placeholder.component';

describe('CanchasPlaceholderComponent', () => {
  let component: CanchasPlaceholderComponent;
  let fixture: ComponentFixture<CanchasPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanchasPlaceholderComponent]
    });
    fixture = TestBed.createComponent(CanchasPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
