/*!
 * tasks/requirejs.js
 * 
 * Copyright (c) 2014
 */

// core
var path = require('path');
var fs   = require('fs');

// 3rd party
var amdclean = require('amdclean');

// lib
var data = require('../lib/data');
var _ = require('../lib/utils');


/* -----------------------------------------------------------------------------
 * task
 * ---------------------------------------------------------------------------*/

module.exports = function (grunt) {

  /* ---------------------------------------------------------------------------
   * load
   * -------------------------------------------------------------------------*/

  grunt.loadTasks(_.taskpath('grunt-contrib-requirejs'));


  /* ---------------------------------------------------------------------------
   * data
   * -------------------------------------------------------------------------*/

  // raw data
  var paths  = data.json('build/modules');
  var shims  = data.json('build/shims');
  var config = data.json('build/config');

  // // add our local copy of mocha to our module paths
  // paths[config.fileName] = '/src';

  // alter paths based on location of runner output
  paths = _.mapValues(paths, function (value) {
    return path.join('../', value);
  });

  // grab from config
  var exclude = config.exclude;
  var out = path.join('dist', config.fileName + '.js');


  /* ---------------------------------------------------------------------------
   * amdclean
   * -------------------------------------------------------------------------*/

  var format = {
    indent: { style: '  ' }
  };

  var escodegen = {
    format: format
  };

  var amdClean = function (data) {
    fs.writeFileSync(data.path, amdclean.clean({
      filePath: data.path,
      escodegen: escodegen,
      prefixMode: 'camelCase',
      wrap: false
    }));
  };


  /* ---------------------------------------------------------------------------
   * options
   * -------------------------------------------------------------------------*/

  var options = {
    name: config.fileName,
    baseUrl: 'src',
    optimize: 'none',
    skipModuleInsertion: true,
    onModuleBundleComplete: amdClean,
    out: out,
    paths: paths,
    shims: shims,
    exclude: exclude
  };


  /* ---------------------------------------------------------------------------
   * config
   * -------------------------------------------------------------------------*/

  grunt.config('requirejs', {
    all: { options: options }
  });

};