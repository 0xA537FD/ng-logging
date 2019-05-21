import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import {
  DEBUG_PREFIX,
  ERROR_PREFIX,
  INFO_PREFIX,
  LoggingService,
  WARN_PREFIX,
} from './logging.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LOGGING_CONFIG } from './config-token';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { DEFAULT_DEBUG_PARAM } from './ds/logging-config';

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

  it('should format the WARN message', () => {
    const spy = spyOn(window.console, 'warn');
    service.warn('this {} {} message {} {}', 'is', 1, true, false);

    expect(spy).toHaveBeenCalledWith(
      WARN_PREFIX + 'this is 1 message true false'
    );
  });

  it('should format the WARN message with an object in the args', () => {
    const spy = spyOn(window.console, 'warn');
    const o = {
      hello: 'peter',
      me: 16,
    };
    service.warn('1 {}', o);

    expect(spy).toHaveBeenCalledWith(WARN_PREFIX + '1 ' + JSON.stringify(o));
  });

  it('should stringify an object as the WARN message', () => {
    const spy = spyOn(window.console, 'warn');
    const o = {
      value: 1111111,
      debug: false,
    };
    service.warn(o);

    expect(spy).toHaveBeenCalledWith(WARN_PREFIX + JSON.stringify(o));
  });

  it('should NOT format the WARN message when using an object as a message', () => {
    const spy = spyOn(window.console, 'warn');
    const o = {
      value: 1111111,
      debug: false,
      title: 'abc',
    };
    service.warn(o, 'format', 1, 420);

    expect(spy).toHaveBeenCalledWith(WARN_PREFIX + JSON.stringify(o));
  });

  it('should format the ERROR message', () => {
    const spy = spyOn(window.console, 'error');
    service.error('{} {} message {}', true, 12, 'word');

    expect(spy).toHaveBeenCalledWith(ERROR_PREFIX + 'true 12 message word');
  });

  it('should format the ERROR message with an object in the args', () => {
    const spy = spyOn(window.console, 'error');
    const o = {
      age: 99,
    };
    service.error('error occurred {}', o);

    expect(spy).toHaveBeenCalledWith(
      ERROR_PREFIX + 'error occurred ' + JSON.stringify(o)
    );
  });

  it('should stringify an object as the ERROR message', () => {
    const spy = spyOn(window.console, 'error');
    const o = {
      p: 's',
    };
    service.error(o);

    expect(spy).toHaveBeenCalledWith(ERROR_PREFIX + JSON.stringify(o));
  });

  it('should NOT format the ERROR message when using an object as a message', () => {
    const spy = spyOn(window.console, 'error');
    const o = {
      timestamp: 83450934853,
      stacktrace: 'garbage',
      error: 'not understandable',
    };
    service.error('something unexpected happened {}', o);

    expect(spy).toHaveBeenCalledWith(
      ERROR_PREFIX + 'something unexpected happened ' + JSON.stringify(o)
    );
  });

  it('should NOT log DEBUG when its not active', () => {
    const spy = spyOn(window.console, 'debug');
    service.debug('something');

    expect(spy).not.toHaveBeenCalled();
  });

  function _activateDebug() {
    const params = {};
    params[DEFAULT_DEBUG_PARAM] = 'true';
    paramsObserver.next(params);
    tick(200);
  }

  it('should log DEBUG when its active', fakeAsync(() => {
    const spy = spyOn(window.console, 'debug');
    _activateDebug();
    service.debug('abc');

    expect(spy).toHaveBeenCalled();
  }));

  it('should format the DEBUG message', fakeAsync(() => {
    const spy = spyOn(window.console, 'debug');
    _activateDebug();
    service.debug('{} {} {} false', 1, 12, 100);

    expect(spy).toHaveBeenCalledWith(DEBUG_PREFIX + '1 12 100 false');
  }));

  it('should format the DEBUG message with an object in the args', fakeAsync(() => {
    const spy = spyOn(window.console, 'debug');
    _activateDebug();
    const o = {
      what: 'object',
      type: false,
    };
    service.debug('an {}', o);

    expect(spy).toHaveBeenCalledWith(DEBUG_PREFIX + 'an ' + JSON.stringify(o));
  }));

  it('should stringify an object as the DEBUG message', fakeAsync(() => {
    const spy = spyOn(window.console, 'debug');
    _activateDebug();
    const o = {
      what: 'object',
      type: false,
    };
    service.debug(o);

    expect(spy).toHaveBeenCalledWith(DEBUG_PREFIX + JSON.stringify(o));
  }));

  it('should NOT format the DEBUG message when using an object as a message', fakeAsync(() => {
    const spy = spyOn(window.console, 'debug');
    _activateDebug();
    const o = {
      gameMode: 'DUO',
      title: 'something',
      games: 3,
      plannedGames: 5,
    };
    service.debug(o, 'what?');

    expect(spy).toHaveBeenCalledWith(DEBUG_PREFIX + JSON.stringify(o));
  }));
});
