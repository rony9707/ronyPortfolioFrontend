import { TestBed } from '@angular/core/testing';

import { SectionScrollService } from './section-scroll.service';

describe('SectionScrollService', () => {
  let service: SectionScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
