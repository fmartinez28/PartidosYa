import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchasListItemComponent } from './canchas-list-item.component';

describe('CanchasListItemComponent', () => {
  let component: CanchasListItemComponent;
  let fixture: ComponentFixture<CanchasListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanchasListItemComponent]
    });
    fixture = TestBed.createComponent(CanchasListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
