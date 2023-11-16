import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosHomeComponent } from './partidos-home.component';

describe('PartidosHomeComponent', () => {
  let component: PartidosHomeComponent;
  let fixture: ComponentFixture<PartidosHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosHomeComponent]
    });
    fixture = TestBed.createComponent(PartidosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
