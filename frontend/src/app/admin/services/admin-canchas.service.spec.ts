import { TestBed } from '@angular/core/testing';

import { AdminCanchasService } from './admin-canchas.service';

describe('CanchasService', () => {
  let service: AdminCanchasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCanchasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
