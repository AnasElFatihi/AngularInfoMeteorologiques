import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardRespGuard } from './auth-guard-resp.guard';

describe('AuthGuardRespGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardRespGuard]
    });
  });

  it('should ...', inject([AuthGuardRespGuard], (guard: AuthGuardRespGuard) => {
    expect(guard).toBeTruthy();
  }));
});
