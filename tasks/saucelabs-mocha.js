/*!
 * tasks/saucelabs-mocha.js
 * 
 * Copyright (c) 2014
 */

// core
var fs = require('fs');

// lib
var data = require('../lib/data');
var _ = require('../lib/utils');


/* -----------------------------------------------------------------------------
 * default browsers
 * ---------------------------------------------------------------------------*/

var defaultBrowsers = [
  // latest versions
  { browserName: 'firefox', platform: 'WIN8' },
  { browserName: 'chrome', platform: 'WIN8' },
  // { browserName: 'opera', platform: 'WIN7' },

  // internet explorer
  { browserName: 'internet explorer', platform: 'WIN8', version: '10' },
  { browserName: 'internet explorer', platform: 'VISTA', version: '9' },
  { browserName: 'internet explorer', platform: 'XP', version: '8' }
];


/* -----------------------------------------------------------------------------
 * task
 * ---------------------------------------------------------------------------*/

module.exports = function (grunt) {

  /* ---------------------------------------------------------------------------
   * load
   * -------------------------------------------------------------------------*/

  grunt.loadTasks(_.taskpath('grunt-saucelabs'));


  /* ---------------------------------------------------------------------------
   * data
   * -------------------------------------------------------------------------*/

  var browsers = data.json('build/modules');

  // use defaults if browsers is empty
  if (!browsers.length) {
    browsers = defaultBrowsers;
  }

  // tests default
  var urls = [
    'http://127.0.0.1:9999/runners/runner.html'
  ];

  // test distribution files
  var amdTest = _.libpath('test/_amd.js');
  var umdTest = _.libpath('test/_umd.js');

  if (fs.existsSync(amdTest)) {
    urls.push('http://127.0.0.1:9999/runners/amd.html');
  }

  if (fs.existsSync(umdTest)) {
    urls.push('http://127.0.0.1:9999/runners/umd.html');
  }


  /* ---------------------------------------------------------------------------
   * config
   * -------------------------------------------------------------------------*/

  grunt.config('saucelabs-mocha', {
    all: {
      options: {
        urls: urls,
        build: process.env.TRAVIS_JOB_ID || '<%= pkg.version %>',
        tunnelTimeout: 5,
        concurrency: 3,
        browsers: browsers,
        testname: '<%= pkg.name %>'
      }
    }
  });

};