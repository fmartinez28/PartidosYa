import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunitiesListComponent } from './comunitieslist.component';

describe('ComunitiesListComponent', () => {
  let component: ComunitiesListComponent;
  let fixture: ComponentFixture<ComunitiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunitiesListComponent]
    });
    fixture = TestBed.createComponent(ComunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
