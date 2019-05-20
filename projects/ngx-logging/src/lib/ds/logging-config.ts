export interface LoggingConfig {
  /**
   * The name of the query parameter which must be set to ``true`` in the url
   * in order to enable the debug log level.
   * Example:
   * http://localhost:4200?debug=true
   *
   * Default: debug
   */
  debugParameter: string;
}
