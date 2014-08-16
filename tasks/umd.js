/*!
 * tasks/umd.js
 * 
 * Copyright (c) 2014
 */

// core
var path = require('path');

// 3rd party
var varname = require('varname');
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

  grunt.loadTasks(_.taskpath('grunt-umd'));


  /* ---------------------------------------------------------------------------
   * data
   * -------------------------------------------------------------------------*/

  var template = _.easypath('templates/umd.hbs');
  var config = data.json('build/config');

  // create object to export
  // ** we are using amdClean camelcase setting.
  var objectToExport = varname.camelback(config.fileName);

  // format from config
  var filePath = path.join('dist', config.fileName + '.js');
  var globalAlias = config.globalAlias || config.fileName;
  var dependencies = config.dependencies || {};


  /* ---------------------------------------------------------------------------
   * config
   * -------------------------------------------------------------------------*/

  grunt.config('umd', {
    all: {
      template: template,
      objectToExport: objectToExport,
      src: filePath,
      dest: filePath,
      globalAlias: globalAlias,
      deps: dependencies
    }
  });

};