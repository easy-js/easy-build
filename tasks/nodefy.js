/*!
 * tasks/nodefy.js
 * 
 * Copyright (c) 2014
 */

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

  grunt.loadTasks(_.taskpath('grunt-easy-nodefy'));


  /* ---------------------------------------------------------------------------
   * options
   * -------------------------------------------------------------------------*/

  var options = data.json('build/nodefy');


  /* ---------------------------------------------------------------------------
   * config
   * -------------------------------------------------------------------------*/

  grunt.config('nodefy', {
    options: options,
    all: {
      expand: true,
      src: ['**/*.js'],
      cwd: 'src/',
      dest: 'dist/common'
    }
  });

};