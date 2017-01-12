'use strict';

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    protractor: {
      options: {
        webdriverManagerUpdate: true,
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: true, // If true, protractor will not use colors in its output.
        //debug: true,
        args: {
          /* Arguments passed to the command */
        }
      },
      e2e: {
        options: {
          configFile: 'e2e-tests/e2e.conf.js', // Default config file
          keepAlive: false
        }
      },
      screenshots: {
        options: {
          configFile: 'e2e-tests/screenshots.conf.js', // Default config file
          keepAlive: false
        }
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
        hostname: 'localhost',
        base: 'www'
      },
      connect: {
        port: 9001
      }
    },

    clean: {
      pre: ['dist', '.tmp']
    },

    copy: {
      main: {
        expand: true,
        cwd: 'www/',
        src: ['**', 'modules/**', 'services/**', 'bower_components/**', 'themes/**'],
        dest: 'dist/'
      }
    },

    rev: {
      files: {
        src: ['dist/**/*.{js,css}', '!dist/cordova.js', '!dist/js/shims/**', '!dist/modules/**', '!dist/resources/**', '!dist/services/**', '!dist/bower_components/**', '!dist/themes/**']
      }
    },

    uglify: {
      options: {
        report: 'min',
        mangle: false
      }
    },

    useminPrepare: {
      html: 'www/index.html'
    },

    usemin: {
      html: ['dist/index.html']
    },

  });

  grunt.registerTask('screenshots', ['connect:connect', 'run:mock_server', 'protractor:screenshots']);
  grunt.registerTask('test', ['connect:connect', 'run:mock_server', 'protractor:e2e']);
  grunt.registerTask('mobile', ['clean:pre', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);

};
