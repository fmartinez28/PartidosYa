import { TestBed } from '@angular/core/testing';

import { ComunidadesService } from './comunidades.service';

describe('ComunidadesService', () => {
  let service: ComunidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
