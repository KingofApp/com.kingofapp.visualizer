'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      continuous: {
        background: true
      }
    },

    protractor: {
      options: {
        configFile: 'e2e-tests/protractor.conf.js', // Default config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: true, // If true, protractor will not use colors in its output.
        //debug: true,
        args: {
          /* Arguments passed to the command */
        }
      },
      e2e: {
        options: {
          keepAlive: false
        }
      },
      continuous: {
        options: {
          keepAlive: true
        }
      },
      cors: {
        options: {
          configFile: 'e2e-tests/protractor.corsconf.js', // Default config file
          keepAlive: false, // If false, the grunt process stops when the test fails.
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },

      karma: {
        files: ['app/js/**/*.js', 'test/unit/*.js'],
        tasks: ['karma:continuous:run']
      },
      protractor: {
        files: ['app/js/**/*.js', 'test/e2e/*.js'],
        tasks: ['protractor:continuous']
      }

    },
    exec: {
      web_driver_update: {
        command: './node_modules/protractor/bin/webdriver-manager update'
      }
    },
    run: {
      mock_server: {
        options: {
          wait: false
        },
        args: []
        // args: ['app/mockApi/apiserver.js']
      }
    },

    connect: {
      options: {
        port: 9001,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          livereload: 35729,
          open: true,
          base: ['app']
        }
      },
      test: {
        options: {
          base: ['app']
        }
      },
      connect: {
        port: 9001,
        base: 'tasks'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('serve', ['karma:continuous:start', 'run:mock_server', 'connect:livereload', 'watch:karma']);
  //grunt.registerTask('unit-test', ['karma:continuous:start', 'watch:karma']);
  grunt.registerTask('local-test', ['connect:test',  'protractor:continuous', 'watch:protractor']);

  grunt.registerTask('test', ['karma:unit:start', 'connect:connect', 'run:mock_server', 'protractor:continuous']);

  grunt.registerTask('unit-test', ['karma:unit:start']);
  grunt.registerTask('e2e-test',        ['exec:web_driver_update' ,'connect:connect', 'protractor:cors', 'protractor:e2e']);
  // grunt.registerTask('e2e-test',        ['exec:web_driver_update' ,'connect:connect', 'protractor:e2e']);
  grunt.registerTask('continuous-test', ['exec:web_driver_update' ,'connect:connect', 'protractor:continuous']);
};
