import { TestBed } from '@angular/core/testing';

import { NavtitleService } from './navtitle.service';

describe('NavtitleService', () => {
  let service: NavtitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavtitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
