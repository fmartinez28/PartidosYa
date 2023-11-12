import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchasListViewComponent } from './canchas-list-view.component';

describe('CanchasListViewComponent', () => {
  let component: CanchasListViewComponent;
  let fixture: ComponentFixture<CanchasListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanchasListViewComponent]
    });
    fixture = TestBed.createComponent(CanchasListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
