import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesSearchViewComponent } from './comunidades-search-view.component';

describe('ComunidadesSearchViewComponent', () => {
  let component: ComunidadesSearchViewComponent;
  let fixture: ComponentFixture<ComunidadesSearchViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesSearchViewComponent]
    });
    fixture = TestBed.createComponent(ComunidadesSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
