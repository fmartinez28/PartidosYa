import { TestBed } from '@angular/core/testing';

import { AdminUsuarioService } from './admin-usuario.service';

describe('UsuarioServiceService', () => {
  let service: AdminUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
