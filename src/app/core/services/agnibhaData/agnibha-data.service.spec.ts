import { TestBed } from '@angular/core/testing';

import { AgnibhaDataService } from './agnibha-data.service';

describe('AgnibhaDataService', () => {
  let service: AgnibhaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgnibhaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
