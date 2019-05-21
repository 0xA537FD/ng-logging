import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggingService } from './logging.service';
import { LoggingConfig } from './ds/logging-config';
import { LOGGING_CONFIG } from './config-token';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
})
export class NgLoggingModule {
  static forRoot(config?: LoggingConfig): ModuleWithProviders<NgLoggingModule> {
    return {
      ngModule: NgLoggingModule,
      providers: [
        LoggingService,
        { provide: LOGGING_CONFIG, useValue: config },
      ],
    };
  }
}
