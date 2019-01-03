import { TestBed } from '@angular/core/testing';

import { GalileoService } from './galileo.service';

describe('GalileoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalileoService = TestBed.get(GalileoService);
    expect(service).toBeTruthy();
  });
});
