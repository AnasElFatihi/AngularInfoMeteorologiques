import { TestBed } from '@angular/core/testing';

import { CapteursService } from './capteurs.service';



describe('CapteursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapteursService = TestBed.get(CapteursService);
    expect(service).toBeTruthy();
  });
});
