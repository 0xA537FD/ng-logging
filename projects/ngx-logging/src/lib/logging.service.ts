import { Inject, Injectable } from '@angular/core';
import { LOGGING_CONFIG } from './config-token';
import { LoggingConfig } from './ds/logging-config';

@Injectable()
export class LoggingService {
  constructor(@Inject(LOGGING_CONFIG) private _config: LoggingConfig) {}
}
