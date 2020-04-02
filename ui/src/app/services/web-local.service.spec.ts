import { TestBed } from '@angular/core/testing';

import { WebLocalService } from './web-local.service';

describe('WebLocalService', () => {
  let service: WebLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
