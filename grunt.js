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
    }
  });

  grunt.loadNpmTasks('grunt-dox');
  grunt.loadNpmTasks('grunt-check-modules');

  // Default task.
  grunt.registerTask('default', 'lint dox');

};
