import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userroleGuard } from './userrole.guard';

describe('userroleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userroleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
