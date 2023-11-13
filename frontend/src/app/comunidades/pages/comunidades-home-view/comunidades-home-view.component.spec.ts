import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesHomeViewComponent } from './comunidades-home-view.component';

describe('ComunidadesHomeViewComponent', () => {
  let component: ComunidadesHomeViewComponent;
  let fixture: ComponentFixture<ComunidadesHomeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesHomeViewComponent]
    });
    fixture = TestBed.createComponent(ComunidadesHomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
