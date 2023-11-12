import { TestBed } from '@angular/core/testing';

import { CanchasService } from './canchas.service';

describe('CanchasService', () => {
  let service: CanchasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanchasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
