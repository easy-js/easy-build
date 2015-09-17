/*!
 * tasks/bump.js
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

  grunt.loadTasks(_.taskpath('grunt-bump'));


  /* ---------------------------------------------------------------------------
   * data
   * -------------------------------------------------------------------------*/

  var filesToChange = ['package.json'];

  // Add bower if present
  var bower;
  try {
    bower = fs.readFileSync('./bower.json');
    filesToChange.push('bower.json');
  } catch(err) {}


  /* ---------------------------------------------------------------------------
   * config
   * -------------------------------------------------------------------------*/

  grunt.config('bump', {
    options: {
      files         : filesToChange,
      commitFiles   : filesToChange,
      updateConfigs : ['pkg'],
      commitMessage : 'v%VERSION%',
      tagName       : '%VERSION%',
      pushTo        : 'origin master'
    }
  });

};