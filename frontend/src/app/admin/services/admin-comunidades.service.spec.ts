import { TestBed } from '@angular/core/testing';

import { AdminComunidadesService } from './admin-comunidades.service';

describe('ComunidadesService', () => {
  let service: AdminComunidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminComunidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
