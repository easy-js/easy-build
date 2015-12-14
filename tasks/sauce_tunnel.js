/*!
 * tasks/sauce_tunnel.js
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

    grunt.loadTasks(_.taskpath('grunt-sauce-tunnel'));


    /* ---------------------------------------------------------------------------
     * data
     * -------------------------------------------------------------------------*/


    /* ---------------------------------------------------------------------------
     * config
     * -------------------------------------------------------------------------*/

    grunt.config('sauce_tunnel_stop', {
        options: {
            identifier: 'tunnel',
        },
        server: {}
    });

    grunt.config('sauce_tunnel', {
        options: {
            username: process.env.SAUCE_USERNAME,
            key: process.env.SAUCE_ACCESS_KEY,
            identifier: process.env.TRAVIS_JOB_NUMBER,
            args: ['-B', 'all'],
            tunnelTimeout: 120 // whatever timeout you want to use
        },
        server: {}
    });

};