import { TestBed } from '@angular/core/testing';

import { SentenceServiceService } from './sentence-service.service';

describe('SentenceServiceService', () => {
  let service: SentenceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentenceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
