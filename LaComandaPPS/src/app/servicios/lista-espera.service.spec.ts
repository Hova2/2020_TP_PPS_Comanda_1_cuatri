import { TestBed } from '@angular/core/testing';

import { ListaEsperaService } from './lista-espera.service';

describe('ListaEsperaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaEsperaService = TestBed.get(ListaEsperaService);
    expect(service).toBeTruthy();
  });
});
