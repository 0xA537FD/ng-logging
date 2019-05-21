import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgLoggingModule } from '../../projects/ng-logging/src/lib/ng-logging.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgLoggingModule.forRoot(),
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
