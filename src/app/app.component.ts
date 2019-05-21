import { Component } from '@angular/core';
import { LoggingService } from '../../projects/ng-logging/src/lib/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _logging: LoggingService) {}

  actionLogDebug() {
    this._logging.debug('hello');
  }
}
