import { TestBed } from '@angular/core/testing';

import { SonidoService } from './sonido.service';

describe('SonidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SonidoService = TestBed.get(SonidoService);
    expect(service).toBeTruthy();
  });
});
