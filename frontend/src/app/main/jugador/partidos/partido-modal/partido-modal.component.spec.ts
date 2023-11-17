import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoModalComponent } from './partido-modal.component';

describe('PartidoModalComponent', () => {
  let component: PartidoModalComponent;
  let fixture: ComponentFixture<PartidoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidoModalComponent]
    });
    fixture = TestBed.createComponent(PartidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
