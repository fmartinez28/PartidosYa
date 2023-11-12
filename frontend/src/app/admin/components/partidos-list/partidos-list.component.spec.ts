import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosListComponent } from './partidos-list.component';

describe('PartidosListComponent', () => {
  let component: PartidosListComponent;
  let fixture: ComponentFixture<PartidosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosListComponent]
    });
    fixture = TestBed.createComponent(PartidosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
