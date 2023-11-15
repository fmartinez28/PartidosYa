import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesFormViewComponent } from './comunidades-form-view.component';

describe('ComunidadesFormViewComponent', () => {
  let component: ComunidadesFormViewComponent;
  let fixture: ComponentFixture<ComunidadesFormViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesFormViewComponent]
    });
    fixture = TestBed.createComponent(ComunidadesFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
