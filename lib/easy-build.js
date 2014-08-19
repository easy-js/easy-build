/*!
 * easy-build.js
 * 
 * Copyright (c) 2014
 */

// lib
var _ = require('./utils');


/* -----------------------------------------------------------------------------
 * default task list
 * ---------------------------------------------------------------------------*/

var defaultTasks = {
  // default
  'default': ['test'],

  // build
  'build': ['build:js'],
  'build:js': ['clean', 'jshint', 'requirejs', 'umd', 'uglify', 'copy', 'nodefy'],

  // test
  'test': ['build', 'test:local'],
  'test:local': ['assemble', 'mocha_phantomjs'],
  'test:sauce': ['assemble', 'connect', 'saucelabs-mocha'],

  // develop
  'dev': ['build', 'assemble', 'connect', 'watch']
};


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
  load: function (grunt, userTasks) {
    // load all tasks
    grunt.loadTasks(_.easypath('tasks'));

    // allow for tasks to be added/overwritten
    var tasks = _.extend({}, defaultTasks, userTasks);

    // run tasks
    _.each(tasks, function (value, key) {
      grunt.registerTask(key, value);
    });
  }

};