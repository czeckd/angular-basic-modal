(function(global) {

  var ngVer = '@2.4.0';

  // map tells the System loader where to look for things
  var map = {
    'app':  'app', // 'dist',
    'rxjs': 'https://unpkg.com/rxjs@5.0.1',
    '@angular': 'https://unpkg.com/@angular'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':  { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs': { defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'platform-browser',
    'platform-browser-dynamic'
  ];

  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://unpkg.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
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
