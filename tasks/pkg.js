/*!
 * tasks/pkg.js
 * 
 * Copyright (c) 2014
 */

// lib
var _ = require('../lib/utils');


/* -----------------------------------------------------------------------------
 * task
 * ---------------------------------------------------------------------------*/

module.exports = function (grunt) {

  /* ---------------------------------------------------------------------------
   * load
   * -------------------------------------------------------------------------*/

  grunt.config('pkg', grunt.file.readJSON('package.json'));

};