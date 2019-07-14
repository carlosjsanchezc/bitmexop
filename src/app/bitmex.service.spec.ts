import { TestBed } from '@angular/core/testing';

import { BitmexService } from './bitmex.service';

describe('BitmexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitmexService = TestBed.get(BitmexService);
    expect(service).toBeTruthy();
  });
});
