export const DEFAULT_DEBUG_PARAM = 'debug';

export interface LoggingConfig {
  /**
   * Whether the application uses the angular router and the DEBUG logging should
   * only be output when the {@link LoggingConfig.debugParameter} is defined.
   *
   * "routable" -> angular router is defined/used
   * "default" -> don't use the router
   *
   * Default: default
   */
  mode?: 'routable' | 'default';
  /**
   * This option only works with the {@link LoggingConfig#mode} "routable".
   *
   * The name of the query parameter which must be set to ``true`` in the url
   * in order to enable the debug log level.
   * Example:
   * http://localhost:4200?debug=true
   *
   * Default: debug
   */
  debugParameter?: string;
}
