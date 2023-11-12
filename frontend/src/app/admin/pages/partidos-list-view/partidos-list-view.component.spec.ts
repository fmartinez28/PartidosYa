import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosListViewComponent } from './partidos-list-view.component';

describe('PartidosListViewComponent', () => {
  let component: PartidosListViewComponent;
  let fixture: ComponentFixture<PartidosListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartidosListViewComponent]
    });
    fixture = TestBed.createComponent(PartidosListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
