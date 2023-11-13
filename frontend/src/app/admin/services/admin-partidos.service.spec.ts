import { TestBed } from '@angular/core/testing';

import { AdminPartidosService } from './admin-partidos.service';

describe('PartidosService', () => {
  let service: AdminPartidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPartidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
