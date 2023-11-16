import { TestBed } from '@angular/core/testing';

import { PropietarioCanchasService } from './propietario-canchas.service';

describe('PropietarioCanchasService', () => {
  let service: PropietarioCanchasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropietarioCanchasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
