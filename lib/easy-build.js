/*!
 * easy-build.js
 * 
 * Copyright (c) 2014
 */

// lib
var _ = require('./utils');


/* -----------------------------------------------------------------------------
 *  task list
 *
 * A task (e.g. test:local) will contain auto-generated pre and post hooks to
 * allow downstream applications to define custom flows.  The auto-generated
 * hooks will be namespaced to that task (for example, test:local:prehook).
 * The downstream app can then write a prehook for its intended flow.
 * (ex: 'test:local:prehook': ['portscan'] )
 *
 * Implementation note: the autogen will also create pre/post hook stubs for
 * each namespace, they will be set to an empty array.
 *
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
  'test:local': ['assemble', 'connect', 'mocha_phantomjs', 'mochaTest'],
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
   * @param {JSON} userTasks - dict with customized downstream tasks
   */
  load: function (grunt, userTasks) {
    // load all tasks
    grunt.loadTasks(_.easypath('tasks'));

    // add pre and post hooks for the task leaders
    for (taskName in defaultTasks){
      var prehook = taskName + ':prehook',
          posthook = taskName + ':posthook';

      var preambleEnd = defaultTasks[taskName].indexOf('assemble') + 1;

      // if the preamble isn't present, its safe to add the prehook
      // at the head of the list
      // if the preamble is present, add the prehook immediately after it

      defaultTasks[taskName].splice(preambleEnd, 0, prehook);
      defaultTasks[taskName].push(posthook);

      // create the stubs
      defaultTasks[prehook] = [];
      defaultTasks[posthook] = [];
    }

    // allow for tasks to be added/overwritten
    var tasks = _.extend({}, defaultTasks, userTasks);

    if (grunt.verbose) {
      grunt.verbose.writeln('Tasks configured by EasyBuild,');
      grunt.verbose.write(JSON.stringify(tasks, null, 2));
    }

    // run tasks
    _.each(tasks, function (value, key) {
      grunt.registerTask(key, value);
    });
  }

};