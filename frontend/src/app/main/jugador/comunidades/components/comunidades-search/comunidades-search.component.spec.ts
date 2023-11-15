import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesSearchComponent } from './comunidades-search.component';

describe('ComunidadesSearchComponent', () => {
  let component: ComunidadesSearchComponent;
  let fixture: ComponentFixture<ComunidadesSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesSearchComponent]
    });
    fixture = TestBed.createComponent(ComunidadesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
