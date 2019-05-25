import { TestBed } from '@angular/core/testing';

import { MesureService } from './mesure.service';

describe('MesureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MesureService = TestBed.get(MesureService);
    expect(service).toBeTruthy();
  });
});
