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

  it('should format the INFO message');

  it('should format the INFO message with an object in args');

  it('should stringify an object as the INFO message');

  it('should NOT format the INFO message when using an object as a message');

  it('should format the WARN message');

  it('should format the WARN message with an object in the args');

  it('should stringify an object as the WARN message');

  it('should NOT format the WARN message when using an object as a message');

  it('should format the ERROR message');

  it('should format the ERROR message with an object in the args');

  it('should stringify an object as the ERROR message');

  it('should NOT format the ERROR message when using an object as a message');

  it('should NOT log DEBUG when its not active');

  it('should log DEBUG when its active');

  it('should format the DEBUG message');

  it('should format the DEBUG message with an object in the args');

  it('should stringify an object as the DEBUG message');

  it('should NOT format the DEBUG message when using an object as a message');
});
