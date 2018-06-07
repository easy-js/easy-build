/*!
 * utils.js
 * 
 * Copyright (c) 2014
 */

// core
var path = require('path');
var fs = require('fs');
var os = require('os');

// 3rd party
var rimraf = require('rimraf');
var _ = require('underscore');
var assist = require('assist.js');


/* -----------------------------------------------------------------------------
 * utils
 * ---------------------------------------------------------------------------*/

module.exports = _;

// assist utils
_.mixin(assist);

// project specific utils
_.mixin({

  /**
   * Returns absolute path of file located in the easy-build module.
   * ** This allows grunt tasks to be installed and nested within this lib
   * rather than setting them as peerDependencies.
   *
   * @example
   * var tasksPath = _.easypath('tasks');
   *
   * @public
   *
   * @param {string} filePath - String of file to retrieve absolute
   *   path for.
   */
  easypath: function (filePath) {
    return path.join(__dirname, '../', filePath);
  },


  /**
   * Returns absolute path of file located in the library directory.
   * ** This allows me to reach out to files located in the consuming
   * library.
   *
   * @example
   * var tasksPath = _.libpath('build/modues.json');
   *
   * @public
   *
   * @param {string} filePath - String of file to retrieve absolute
   *   path for.
   */
  libpath: function (filePath) {
    return path.join(process.cwd(), filePath);
  },


  /**
   * Returns absolute path of library tasks installed by easy-build.
   *
   * @example
   * var taskPath = _.taskpath('grunt-contrib-clean');
   *
   * @public
   *
   * @param {string} taskName - Directory name of file to look up.
   */
  taskpath: function (taskName) {
    var pkg = require.resolve(taskName + '/package.json');
    var pkgDir = path.dirname(pkg);
  
    return path.join(pkgDir, 'tasks');
  },


  /**
   * Create file in temporary easy-build directory.
   *
   * @example
   * var tasksPath = _.tmpFile('tasks');
   *
   * @public
   *
   * @param {filename} fileName - Name of file to write.
   * @param {function} data- Data to write.
   */
  tmpDir: function (dirPath) {
    // create directory if it does not exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);

      process.on('exit', function(code) {
        rimraf.sync(dirPath);
      });
    }

    return dirPath;  
  },


  /**
   * Create file in temporary easy-build directory.
   *
   * @example
   * var tasksPath = _.tmpFile('tasks');
   *
   * @public
   *
   * @param {filename} fileName - Name of file to write.
   * @param {function} data- Data to write.
   */
  writeFile: function (dirPath, fileName, data) {
    var filePath = path.join(dirPath, fileName);

    // write temp
    var file = fs.openSync(filePath, 'w');
    fs.writeSync(file, data);
    fs.closeSync(file);

    return filePath;  
  }

});