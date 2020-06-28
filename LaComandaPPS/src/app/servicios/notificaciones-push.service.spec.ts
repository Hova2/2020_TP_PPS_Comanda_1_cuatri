import { TestBed } from '@angular/core/testing';

import { NotificacionesPushService } from './notificaciones-push.service';

describe('NotificacionesPushService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificacionesPushService = TestBed.get(NotificacionesPushService);
    expect(service).toBeTruthy();
  });
});
