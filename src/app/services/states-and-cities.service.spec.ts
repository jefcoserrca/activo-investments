import { TestBed } from '@angular/core/testing';

import { StatesAndCitiesService } from './states-and-cities.service';

describe('StatesAndCitiesService', () => {
  let service: StatesAndCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatesAndCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
