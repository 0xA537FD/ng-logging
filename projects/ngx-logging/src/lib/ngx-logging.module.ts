import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggingService } from './logging.service';
import { LoggingConfig } from './ds/logging-config';
import { LOGGING_CONFIG } from './config-token';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
})
export class NgxLoggingModule {
  static forRoot(
    config?: LoggingConfig
  ): ModuleWithProviders<NgxLoggingModule> {
    return {
      ngModule: NgxLoggingModule,
      providers: [
        LoggingService,
        { provide: LOGGING_CONFIG, useValue: config },
      ],
    };
  }
}
