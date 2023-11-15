import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioCanchasPageComponent } from './propietario-canchas-page.component';

describe('PropietarioCanchasPageComponent', () => {
  let component: PropietarioCanchasPageComponent;
  let fixture: ComponentFixture<PropietarioCanchasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioCanchasPageComponent]
    });
    fixture = TestBed.createComponent(PropietarioCanchasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
