/*!
 * tasks/assemble.js
 * 
 * Copyright (c) 2014
 */

// core
var path = require('path');
var fs = require('fs');

// lib
var _ = require('../lib/utils');
var data = require('../lib/data');


/* -----------------------------------------------------------------------------
 * task
 * ---------------------------------------------------------------------------*/

module.exports = function (grunt) {

  /* ---------------------------------------------------------------------------
   * load
   * -------------------------------------------------------------------------*/

  grunt.loadTasks(_.taskpath('assemble'));


  /* ---------------------------------------------------------------------------
   * data
   * -------------------------------------------------------------------------*/

  // raw data
  var paths  = _.extend(data.json('build/modules'), data.json('build/modules-test'));
  var shims  = _.extend(data.json('build/shims'), data.json('build/shims-test'));
  var tests  = data.files('test', '.js');
  var config = data.json('build/config');

  // add our local copy of mocha to our module paths
  paths['mocha'] = '/node_modules/easy-build/node_modules/mocha/mocha';

  // alter paths based on location of runner output
  paths = _.mapValues(paths, function (value) {
    return path.join('../', value);
  });

  // tests
  tests = _.clip(tests, ['_umd.js', '_amd.js']);
  tests = _.map(tests, function (value) {
    return path.join('../', 'test', value);
  });

  // dependencies
  deps = config['testDependencies'] || [];

  // create temp directory to dump stuffs
  var tmpDir = _.tmpDir(_.libpath('runners'));

  // create data file to template runner
  // ** temporary: https://github.com/assemble/assemble/pull/519
  var dataPath = _.writeFile(tmpDir, 'data.json', JSON.stringify({
    fileName: config.fileName,
    paths: JSON.stringify(paths),
    shims: JSON.stringify(shims),
    tests: JSON.stringify(tests),
    deps: JSON.stringify(deps)
  }));


  /* ---------------------------------------------------------------------------
   * config
   * -------------------------------------------------------------------------*/

  grunt.config('assemble', {
    options: {
      data: dataPath
    },
    all: {
      expand: true,
      src: ['**/*.hbs'],
      cwd: _.easypath('runners'),
      dest: tmpDir,
      ext: '.html'
    }
  });

};