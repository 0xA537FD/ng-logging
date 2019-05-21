# NG-LOGGING

NG-LOGGING is a simple lightweight logger for angular.

## Getting started

Install ``ng-logging`` using npm.

```
npm i ng-logging
```

Then add it to your app.
```typescript
@NgModule({
  imports: [
    NgLoggingModule.forRoot({
      debugParameter: 'desperate'
    })
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

The debug logs will only be enable when we have it enabled. It's called ``debug`` by default but can be changed in the module config.
In the case of this example it's ``desperate``. So to enable debug logging we would have to visit the url: ``http://localhost:4200?debug=true``.
