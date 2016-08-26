(function(global) {

  var ngVer = '@2.0.0-rc.5'; // lock in the angular package version; do not let it float to current!
  var formsVer = '@0.3.0'; // lock forms version
  var routerDeprecatedVer = '@2.0.0-rc.2'; // temporarily until we update all the guides

  // map tells the System loader where to look for things
  var map = {
    '@angular':                   'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
    '@angular/forms':             'https://npmcdn.com/@angular/forms' + formsVer,
    '@angular/router-deprecated': 'https://npmcdn.com/@angular/router-deprecated' + routerDeprecatedVer,
    'rxjs':                       'https://npmcdn.com/rxjs@5.0.0-beta.6',
    'angular2-jwt':               'static/dist/lib/angular2-jwt'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-jwt':               { defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.concat(['forms', 'router', 'router-deprecated']).forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);