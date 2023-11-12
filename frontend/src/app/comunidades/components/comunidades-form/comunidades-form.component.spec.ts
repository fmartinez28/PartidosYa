import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesFormComponent } from './comunidades-form.component';

describe('ComunidadesFormComponent', () => {
  let component: ComunidadesFormComponent;
  let fixture: ComponentFixture<ComunidadesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesFormComponent]
    });
    fixture = TestBed.createComponent(ComunidadesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
