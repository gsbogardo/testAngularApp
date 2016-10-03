module.exports = function(grunt) {

  // Load grunt tasks automatically, except for jasmine-instanbul which will be loaded by the jasmine task directly
  require('load-grunt-tasks')(grunt, {
      pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
          options: {
              curly : true,
              eqeqeq : true,
              forin: true,
              immed: true,
              noarg: true,
              undef : true,
              unused : "vars",
              latedef : true,
              trailing : true,
              globalstrict: true,
              indent : 4,
              maxlen : 100,
              newcap : false
          },
          client : {
              files : {
                  src : [ 'app/**/*.js']
              },
              options : {
                  browser : true,
                  globals : {
                      angular : false,
                      define : false,
                      StatusBar : false,
                      console : false,
                      L : false,
                      Camera : false,
                      CaptureError : false,
                      cordova : false
                  }
              }
          }
      },
      karma: {
          unit: {
              configFile: 'karma.conf.js',
              singleRun: true,
              browsers: ['PhantomJS']
          }
      },
      jasmine: {
        coverage: {
            src: [
                'app/**/*.js',
                //exclude example
                //'!scripts/services/*.js',
            ],
            options: {
                specs: 'test/**/*.spec.js',
                vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-ui-router/release/angular-ui-router.js',
                        'bower_components/angular-sanitize/angular-sanitize.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'bower_components/angular-ui-bootstrap/ui-bootstrap-0.13.3.min.js',
                        'bower_components/angular-cookies/angular-cookies.js'
                        ],

                //vendor: ['bower_components/localforage/dist/localforage.js',
                //         'bower_components/angular-localForage/dist/angular-localForage.js'],
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'coverage/coverage.json',
                    report: 'coverage',
                    thresholds: {
                    //TODO - bump these way up once tests are written
                        lines: 63,
                        statements: 63,
                        branches: 46,
                        functions: 58
                    }
                }
            }
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');
  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
