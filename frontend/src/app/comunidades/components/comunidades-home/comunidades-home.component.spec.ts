import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesHomeComponent } from './comunidades-home.component';

describe('ComunidadesHomeComponent', () => {
  let component: ComunidadesHomeComponent;
  let fixture: ComponentFixture<ComunidadesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesHomeComponent]
    });
    fixture = TestBed.createComponent(ComunidadesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
