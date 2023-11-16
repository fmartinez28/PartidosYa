import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioCanchasListComponent } from './propietario-canchas-list.component';

describe('PropietarioCanchasListComponent', () => {
  let component: PropietarioCanchasListComponent;
  let fixture: ComponentFixture<PropietarioCanchasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioCanchasListComponent]
    });
    fixture = TestBed.createComponent(PropietarioCanchasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
