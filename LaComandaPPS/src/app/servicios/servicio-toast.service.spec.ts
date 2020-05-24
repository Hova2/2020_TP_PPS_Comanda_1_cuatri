import { TestBed } from '@angular/core/testing';

import { ServicioToastService } from './servicio-toast.service';

describe('ServicioToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioToastService = TestBed.get(ServicioToastService);
    expect(service).toBeTruthy();
  });
});
