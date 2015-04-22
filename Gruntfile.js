'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'example',
          src: ['index.html', 'img/*', 'css/*'],
          dest: './dist/'
        }]
      }
    },
    browserify: {
      options: {
        transform: ['brfs'],
        debug: true
      },
      debug: {
        files: {
          './dist/js/bundle.js': './example/js/app.js'
        }
      }
    },
    watch: {
      app: {
        files: 'example/**',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'browserify:debug', 'watch:app']);
};
