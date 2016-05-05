(function(global) {

  var ngVer = '@2.0.0-rc.1';

  // map tells the System loader where to look for things
  var map = {
    'app':  'app', // 'dist',
    'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':  { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs': { defaultExtension: 'js' }
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic'
  ];

  // add map entries for angular packages in the form '@angular/common': 'https://npmcdn.com/@angular/common@0.0.0-3?main=browser'
  packageNames.forEach(function(pkgName) {
	map[pkgName] = 'https://npmcdn.com/' + pkgName + ngVer;
  });

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });


  var config = {
	transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before it is registered.
  if (global.filterSystemConfig) { 
    global.filterSystemConfig(config); 
  }

  System.config(config);

})(this);
