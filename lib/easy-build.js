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
  'build:js': ['clean:dist', 'jshint', 'requirejs', 'umd', 'uglify', 'copy:amd', 'nodefy'],
  'build:docs': ['clean:docs', 'easydocs', 'copy:docs'],

  // test
  'test': ['build', 'test:local'],
  'test:local': ['assemble', 'mocha_phantomjs', 'connect', 'mochaTest'],
  'test:sauce': ['assemble', 'connect', 'saucelabs-mocha'],

  // generate and deploy docs
  'publish:docs': ['build:docs', 'gh-pages'],

  // release version
  'release:patch': ['bump:patch', 'publish:docs'],
  'release:minor': ['bump:minor', 'publish:docs'],
  'release:major': ['bump:major', 'publish:docs'],

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