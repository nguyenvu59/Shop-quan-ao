// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  API: {
    url: 'http://localhost:8280/api/v1',
    // urlUPload: 'http://localhost:8280/api/v1/file/upload',  
    urlUPload: 'http://103.120.242.175:8080/storage/upload ',
    urlViewImage: 'http://103.120.242.175:8080/static/',
  },
  path: {
    assets: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
