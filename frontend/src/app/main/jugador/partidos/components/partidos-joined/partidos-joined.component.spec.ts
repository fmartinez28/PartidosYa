import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosJoinedComponent } from './partidos-joined.component';

describe('PartidosJoinedComponent', () => {
  let component: PartidosJoinedComponent;
  let fixture: ComponentFixture<PartidosJoinedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosJoinedComponent]
    });
    fixture = TestBed.createComponent(PartidosJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
