import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosSearchComponent } from './partidos-search.component';

describe('PartidosSearchComponent', () => {
  let component: PartidosSearchComponent;
  let fixture: ComponentFixture<PartidosSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosSearchComponent]
    });
    fixture = TestBed.createComponent(PartidosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
