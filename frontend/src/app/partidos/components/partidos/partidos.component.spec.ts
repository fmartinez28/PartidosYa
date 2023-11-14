import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosComponent } from './partidos.component';

describe('PartidosComponent', () => {
  let component: PartidosComponent;
  let fixture: ComponentFixture<PartidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosComponent]
    });
    fixture = TestBed.createComponent(PartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
