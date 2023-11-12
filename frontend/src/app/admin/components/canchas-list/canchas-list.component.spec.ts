import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchasListComponent } from './canchas-list.component';

describe('CanchasListComponent', () => {
  let component: CanchasListComponent;
  let fixture: ComponentFixture<CanchasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanchasListComponent]
    });
    fixture = TestBed.createComponent(CanchasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
