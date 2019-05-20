import { Inject, Injectable } from '@angular/core';
import { LOGGING_CONFIG } from './config-token';
import { LoggingConfig } from './ds/logging-config';
import * as format_ from 'string-format';
const format = format_;

export const INFO_PREFIX = '[INFO] ';
export const WARN_PREFIX = '[WARN] ';
export const ERROR_PREFIX = '[ERROR] ';
export const DEBUG_PREFIX = '[DEBUG] ';

@Injectable()
export class LoggingService {
  constructor(@Inject(LOGGING_CONFIG) private _config: LoggingConfig) {}

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
    // TODO(pmo): Needs to be implemented
  }

  error(
    message: string | number | boolean | object,
    ...args: Array<string | number | boolean | object>
  ) {
    // TODO(pmo): Needs to be implemented
  }

  debug(
    message: string | number | boolean | object,
    ...args: Array<string | number | boolean | object>
  ) {
    // TODO(pmo): Needs to be implemented
  }
}
