import { TestBed } from '@angular/core/testing';

import { ContainerserviceService } from './containerservice.service';

describe('ContainerserviceService', () => {
  let service: ContainerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
