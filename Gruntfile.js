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
	      configFile: "e2e-tests/protractor.conf.js", // Default config file
	      // keepAlive: true, // If false, the grunt process stops when the test fails.
	      noColor: false, // If true, protractor will not use colors in its output.
	      // debug: true,
	      args: {

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
	    }
	  },

		watch: {
      options: {
      	livereload: true
      },
      
      karma: {
        files: ['app/js/**/*.js', 'test/unit/*.js'],
        tasks: ['karma:continuous:run']
      }
      ,
      protractor: {
        files: ['app/js/**/*.js', 'test/e2e/*.js'],
        tasks: ['protractor:continuous']
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
			port: 8000,
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
			port: 9000,
      		base: 'tasks'
		}
	}
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-browser-sync')

	grunt.registerTask('serve', ['karma:continuous:start', 'run:mock_server', 'connect:livereload', 'watch:karma']);
	grunt.registerTask('unit-test', ['karma:continuous:start', 'watch:karma']);
	grunt.registerTask('local-test', ['connect:test',  'protractor:continuous', 'watch:protractor']);

	grunt.registerTask('test', ['karma:unit:start', 'connect:connect', 'run:mock_server', 'protractor:continuous']);

	grunt.registerTask('unit-test', ['karma:unit:start']);
	grunt.registerTask('e2e-test', ['connect:connect',  'protractor:continuous']);

};