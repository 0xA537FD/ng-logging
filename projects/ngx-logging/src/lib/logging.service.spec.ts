import { TestBed } from '@angular/core/testing';

import { INFO_PREFIX, LoggingService } from './logging.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LOGGING_CONFIG } from './config-token';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';

describe('LoggingService', () => {
  let service: LoggingService;
  let fakeActivatedRoute: any;
  let paramsObserver: Observer<any>;

  beforeEach(() => {
    fakeActivatedRoute = {
      queryParams: Observable.create(observer => (paramsObserver = observer)),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LoggingService,
        { provide: LOGGING_CONFIG, useValue: {} },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    });

    service = TestBed.get(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format the INFO message', () => {
    const spy = spyOn(window.console, 'log');
    service.info(
      'some {} which {} {} logged {} {}',
      'message',
      'should',
      'be',
      12,
      false
    );

    expect(spy).toHaveBeenCalledWith(
      INFO_PREFIX + 'some message which should be logged 12 false'
    );
  });

  it('should format the INFO message with an object in args', () => {
    const spy = spyOn(window.console, 'log');
    const o = {
      name: 'Peter',
      type: 'git',
    };
    service.info('some message with an {}', o);

    expect(spy).toHaveBeenCalledWith(
      INFO_PREFIX + 'some message with an ' + JSON.stringify(o)
    );
  });

  it('should stringify an object as the INFO message', () => {
    const spy = spyOn(window.console, 'log');
    const o = {
      status: 12,
      enabled: false,
      message: ':(){:|:&};:',
    };
    service.info(o);

    expect(spy).toHaveBeenCalledWith(INFO_PREFIX + JSON.stringify(o));
  });

  it('should NOT format the INFO message when using an object as a message', () => {
    const spy = spyOn(window.console, 'log');
    const o = {
      me: 'bread',
      t: 1337,
    };
    service.info(o, 'some', 'random', 'params', 13, true, true);

    expect(spy).toHaveBeenCalledWith(INFO_PREFIX + JSON.stringify(o));
  });

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
