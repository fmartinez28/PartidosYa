import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesListViewComponent } from './comunidades-list-view.component';

describe('ComunidadesListViewComponent', () => {
  let component: ComunidadesListViewComponent;
  let fixture: ComponentFixture<ComunidadesListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesListViewComponent]
    });
    fixture = TestBed.createComponent(ComunidadesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
