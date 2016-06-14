(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'gadget_board_frontend':      'static/dist/gadget_board_frontend',
    'rxjs':                       'static/dist/lib/rxjs',
    'angular2-in-memory-web-api': 'static/dist/lib/angular2-in-memory-web-api',
    '@angular':                   'static/dist/lib/@angular',
    'angular2-jwt':               'static/dist/lib/angular2-jwt'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'gadget_board_frontend':      { main: 'main.js',
                                    format: 'register',
                                    defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-jwt':               { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);