/*!
 * easy-build.js
 * 
 * Copyright (c) 2014
 */

// lib
var _ = require('./utils');


/* -----------------------------------------------------------------------------
 * builder
 * ---------------------------------------------------------------------------*/

module.exports = {

  /**
   * Load & register tasks.
   *
   * @example
   * easybuild.load(grunt);
   *
   * @public
   *
   * @param {object} grunt - grunt instance.
   */
  load: function (grunt) {
    // load all tasks
    grunt.loadTasks(_.easypath('tasks'));

    // default
    grunt.registerTask('default', ['test']);

    // build
    grunt.registerTask('build', ['build:js']);
    grunt.registerTask('build:js', ['clean', 'jshint', 'requirejs', 'umd', 'uglify', 'copy', 'nodefy']);

    // test
    grunt.registerTask('test', ['build', 'test:local']);
    grunt.registerTask('test:local', ['assemble', 'mocha_phantomjs']);
    grunt.registerTask('test:sauce', ['assemble', 'connect', 'saucelabs-mocha']);

    // develop
    grunt.registerTask('dev', ['build', 'connect', 'watch']);
  }

};