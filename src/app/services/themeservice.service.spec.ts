import { TestBed } from '@angular/core/testing';

import { ThemeserviceService } from './themeservice.service';

describe('ThemeserviceService', () => {
  let service: ThemeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
