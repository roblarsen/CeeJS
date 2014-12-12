"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
  });

  // Load tasks and configuration.
  grunt.loadTasks("build");

  // Register alias tasks.
  grunt.registerTask("lint",
    "Statically analyze the project JavaScript for errors and code style",
    ["jscs", "jshint"]);

  // grunt.registerTask("test",
  //   "Run the unit tests in a headless browser",
  //   ["mocha"]);

  grunt.registerTask("dev",
    "Start a development web server.",
    ["lint", /* "test", */ "watch"]);

  grunt.registerTask("dist",
    "Compile for distribution.",
    ["lint", /* "test", */ "clean:dist", "copy:dist", "uglify:dist", "jsdoc",
      "rename"]);

  grunt.registerTask("default", ["dev"]);

};