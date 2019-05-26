# NG-LOGGING

NG-LOGGING is a simple lightweight logger for angular.

## Getting started

Install ``ng-logging`` using npm.

```
npm i ng-logging
```

Then add it to your app.

By default it won't depend on the router so all log levels will be logged.
```typescript
@NgModule({
  imports: [
    NgLoggingModule.forRoot(),
    ...
  ]
})
export class AppModule {}
```

When you have routing setup for your project you can also switch the mode of the
``NgLoggingModule`` to ``routable`` and the debug logs will only be logged when
the ``debugParameter`` is set to ``true`` e.g. ``http://localhost:4200?debug=true``.
By default the ``debugParameter`` is called ``debug`` but you can change it's name in the
configuration of the ``NgLoggingModule``.

```typescript
@NgModule({
  imports: [
    RouterModule.forRoot([{path: '', component: HomeComponent}]),
    NgLoggingModule.forRoot({
      mode: 'routable',
      debugParameter: 'verbose'
    }),
    ...
  ]
})
export class AppModule {}
```

## Usage

```typescript
@Component({
  ...
})
export class SomeFancyComponent implements OnInit {
  constructor(private _logging: LoggingService, private _dataProvider: DataProvider) {}
  
  ngOnInit() {
    this._dataProvider.getSomeData().subscribe(value => {
      this._logging.debug('received: {}', value);
      ...
    }, error => {
      this._logging.error(error);
    })
  }
  
  actionDoSomething() {
    this._logging.debug('I was called');
  }
}
```
