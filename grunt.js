"use strict";
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: [ 'test/**/*.js' ]
    },
    lint: {
      all: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    jshint: {
      options: {
        node: true
      }
    },
    dox: {
      files: {
        src: ['lib/**/*.js'],
        dest: 'docs'
      }
    },
    'heroku-deploy' : {
        master : {
            deployBranch : 'deploy'
        }
    },
    markdown: {
        all: {
          files: ['README.md'],
          dest: 'docs/'
        }
      }
  });

  grunt.loadNpmTasks('grunt-dox');
  grunt.loadNpmTasks('grunt-check-modules');
  grunt.loadNpmTasks('grunt-heroku-deploy');
  grunt.loadNpmTasks('grunt-markdown');

  // Default task.
  grunt.registerTask('default', 'lint dox check-modules');

};
