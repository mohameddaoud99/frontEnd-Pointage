import { TestBed } from '@angular/core/testing';

import { RemplacementService } from './remplacement.service';

describe('RemplacementService', () => {
  let service: RemplacementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemplacementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
