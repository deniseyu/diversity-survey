module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concurrent: {
      dev: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      local: {
        script: 'server/index.js',
        options: {
          env: {
            PORT: '9091'
          },
          ext: 'js',
          watch: ['server']
        }
      }
    },
    watch: {
      css: {
        files: ['server/assets/stylesheets/*.less'],
        tasks: ['less']
      }
    },
    less: {
      style: {
        files: {
          "server/assets/stylesheets/styles.css": "server/assets/stylesheets/main.less"
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('start', ['concurrent']);

};
