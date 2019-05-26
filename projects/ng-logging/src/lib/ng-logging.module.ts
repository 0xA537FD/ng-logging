import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggingService } from './logging.service';
import { LoggingConfig } from './ds/logging-config';
import { LOGGING_CONFIG } from './config-token';
import { RouterModule } from '@angular/router';

@NgModule({})
export class NgLoggingModule {
  static forRoot(config?: LoggingConfig): ModuleWithProviders<NgLoggingModule> {
    if (config && config.mode && config.mode === 'routable') {
      return {
        ngModule: RoutableNgLoggingModule,
        providers: [
          LoggingService,
          { provide: LOGGING_CONFIG, useValue: config },
        ],
      };
    }

    return {
      ngModule: DefaultNgLoggingModule,
      providers: [
        LoggingService,
        { provide: LOGGING_CONFIG, useValue: config },
      ],
    };
  }
}

@NgModule({
  imports: [RouterModule],
})
class RoutableNgLoggingModule {}

@NgModule({})
class DefaultNgLoggingModule {}
