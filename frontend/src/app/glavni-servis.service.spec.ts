import { TestBed } from '@angular/core/testing';

import { GlavniServisService } from './glavni-servis.service';

describe('GlavniServisService', () => {
  let service: GlavniServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlavniServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
