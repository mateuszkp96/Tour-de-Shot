import { TestBed } from '@angular/core/testing';

import { StartPointService } from './start-point.service';

describe('StartPointService', () => {
  let service: StartPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
