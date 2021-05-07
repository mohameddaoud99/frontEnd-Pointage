import { TestBed } from '@angular/core/testing';

import { PreratServiceService } from './prerat-service.service';

describe('PreratServiceService', () => {
  let service: PreratServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreratServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
