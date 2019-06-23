import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardUserGuard } from './auth-guard-user.guard';

describe('AuthGuardUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardUserGuard]
    });
  });

  it('should ...', inject([AuthGuardUserGuard], (guard: AuthGuardUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
