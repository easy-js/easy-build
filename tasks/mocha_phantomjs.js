/*!
 * tasks/mocha_phantomjs.js
 * 
 * Copyright (c) 2014
 */

// core
var fs = require('fs');

// lib
var _ = require('../lib/utils');


/* -----------------------------------------------------------------------------
 * task
 * ---------------------------------------------------------------------------*/

module.exports = function (grunt) {

  /* ---------------------------------------------------------------------------
   * load
   * -------------------------------------------------------------------------*/

  grunt.loadTasks(_.taskpath('grunt-mocha-phantomjs'));


  /* ---------------------------------------------------------------------------
   * data
   * -------------------------------------------------------------------------*/

  // urls default
  var urls = [
    'http://localhost:9999/runners/runner.html'
  ];

  // test distribution files
  var amdTest = _.libpath('test/_amd.js');
  var umdTest = _.libpath('test/_umd.js');

  if (fs.existsSync(amdTest)) {
    urls.push('http://localhost:9999/runners/amd.html');
  }

  if (fs.existsSync(umdTest)) {
    urls.push('http://localhost:9999/runners/umd.html');
  }


  /* ---------------------------------------------------------------------------
   * config
   * -------------------------------------------------------------------------*/

  grunt.config('mocha_phantomjs', {
    all: {
      options: { urls: urls }
    }
  });

};