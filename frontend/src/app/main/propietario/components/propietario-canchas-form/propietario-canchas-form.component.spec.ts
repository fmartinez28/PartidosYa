import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioCanchasFormComponent } from './propietario-canchas-form.component';

describe('PropietarioCanchasFormComponent', () => {
  let component: PropietarioCanchasFormComponent;
  let fixture: ComponentFixture<PropietarioCanchasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioCanchasFormComponent]
    });
    fixture = TestBed.createComponent(PropietarioCanchasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
