import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesListComponent } from './comunidades-list.component';

describe('ComunidadesListComponent', () => {
  let component: ComunidadesListComponent;
  let fixture: ComponentFixture<ComunidadesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesListComponent]
    });
    fixture = TestBed.createComponent(ComunidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
