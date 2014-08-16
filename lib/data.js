/*!
 * data.js
 * 
 * Copyright (c) 2014
 */

// core
var path = require('path');
var fs = require('fs');

// lib
var _ = require('./utils');


/* -----------------------------------------------------------------------------
 * data
 * ---------------------------------------------------------------------------*/

var data = module.exports = {

  /**
   * Return data or empty object (found in cwd/build/modules.json)
   *
   * @example
   * var modules = data.json('modules');
   *
   * @public
   *
   * @param {string} name - file name to fetch
   */
  json: function (name) {
    var path = _.libpath(name + '.json');
    var data;

    try {
      data = JSON.parse(fs.readFileSync(path));
    } catch (err) {
      data = {};
    }

    return data;
  },


  /**
   * Search tests directory for all files in the
   * test directory.
   *
   * @example
   * var tests = data.files('test');
   *
   * @public
   *
   * @param {string} name - name of directory to fetch
   *   files from.
   */
  files: function (name, ext) {
    var directory = _.libpath('test');
    var files = fs.readdirSync(directory);
    var tests = [];

    _.each(files, function (value, key) {
      var file = path.join(directory, files[key]);

      if (fs.statSync(file).isFile()) {
        if (!ext || path.extname(file) === ext) {
          tests.push(files[key]);
        }
      }
    });

    return tests;
  }

};