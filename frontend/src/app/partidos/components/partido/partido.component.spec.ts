import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoComponent } from './partido.component';

describe('PartidoComponent', () => {
  let component: PartidoComponent;
  let fixture: ComponentFixture<PartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidoComponent]
    });
    fixture = TestBed.createComponent(PartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
