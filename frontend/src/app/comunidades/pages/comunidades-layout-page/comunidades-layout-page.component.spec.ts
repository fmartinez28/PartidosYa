import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesLayoutPageComponent } from './comunidades-layout-page.component';

describe('ComunidadesHomePageComponent', () => {
  let component: ComunidadesLayoutPageComponent;
  let fixture: ComponentFixture<ComunidadesLayoutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesLayoutPageComponent]
    });
    fixture = TestBed.createComponent(ComunidadesLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
