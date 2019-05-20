import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoggingService],
    });

    service = TestBed.get(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
