"use strict";
module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');
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
    yuidoc: {
      master: {
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        url: pkg.homepage,
        options: {
          paths: [ '.' ],
          exclude: 'node_modules,public/libs',
          outdir: 'docs/'
        }
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
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  //grunt.registerTask('docs', 'yuidoc');
  // Default task.
  grunt.registerTask('default', 'lint yuidoc check-modules');

};
