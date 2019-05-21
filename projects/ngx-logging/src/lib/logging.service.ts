import { Inject, Injectable } from '@angular/core';
import { LOGGING_CONFIG } from './config-token';
import { DEFAULT_DEBUG_PARAM, LoggingConfig } from './ds/logging-config';
import * as format_ from 'string-format';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
const format = format_;

export const INFO_PREFIX = '[INFO] ';
export const WARN_PREFIX = '[WARN] ';
export const ERROR_PREFIX = '[ERROR] ';
export const DEBUG_PREFIX = '[DEBUG] ';

@Injectable()
export class LoggingService {
  private _debug = false;
  private readonly _routeSub: Subscription | null = null;

  constructor(
    @Inject(LOGGING_CONFIG) private _config: LoggingConfig,
    private _route: ActivatedRoute
  ) {
    let debugParamName = DEFAULT_DEBUG_PARAM;
    if (this._config && this._config.debugParameter) {
      debugParamName = this._config.debugParameter;
    }

    this._routeSub = this._route.queryParams.subscribe(params => {
      if (params && typeof params[debugParamName] !== 'undefined') {
        this._debug = params[debugParamName] === 'true';
      }
    });
  }

  info(
    message: string | number | boolean | object,
    ...args: Array<string | number | boolean | object>
  ) {
    console.log(INFO_PREFIX + this._buildLogMessage(message, ...args));
  }

  private _buildLogMessage(
    message: string | number | boolean | object,
    ...args: Array<string | number | boolean | object>
  ) {
    if (typeof message === 'string') {
      return format(message, ...args.map(x => this._buildLogMessage(x)));
    } else if (typeof message === 'object') {
      return JSON.stringify(message);
    }

    return message.toString();
  }

  warn(
    message: string | number | boolean | object,
    ...args: Array<string | number | boolean | object>
  ) {
    console.warn(WARN_PREFIX + this._buildLogMessage(message, ...args));
  }

  error(
    message: string | number | boolean | object,
    ...args: Array<string | number | boolean | object>
  ) {
    console.error(ERROR_PREFIX + this._buildLogMessage(message, ...args));
  }

  debug(
    message: string | number | boolean | object,
    ...args: Array<string | number | boolean | object>
  ) {
    if (!this._debug) {
      return;
    }

    console.debug(DEBUG_PREFIX + this._buildLogMessage(message, ...args));
  }
}
