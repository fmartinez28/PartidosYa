import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadesListItemComponent } from './comunidades-list-item.component';

describe('ComunidadesListItemComponent', () => {
  let component: ComunidadesListItemComponent;
  let fixture: ComponentFixture<ComunidadesListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunidadesListItemComponent]
    });
    fixture = TestBed.createComponent(ComunidadesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
