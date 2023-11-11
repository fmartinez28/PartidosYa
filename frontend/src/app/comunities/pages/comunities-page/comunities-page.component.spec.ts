import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunitiesPageComponent } from './comunities-page.component';

describe('ComunitiesPageComponent', () => {
  let component: ComunitiesPageComponent;
  let fixture: ComponentFixture<ComunitiesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunitiesPageComponent]
    });
    fixture = TestBed.createComponent(ComunitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
