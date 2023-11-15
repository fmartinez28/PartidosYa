import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioCanchasListItemComponent } from './propietario-canchas-list-item.component';

describe('PropietarioCanchasListItemComponent', () => {
  let component: PropietarioCanchasListItemComponent;
  let fixture: ComponentFixture<PropietarioCanchasListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioCanchasListItemComponent]
    });
    fixture = TestBed.createComponent(PropietarioCanchasListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
