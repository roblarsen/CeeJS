"use strict";

module.exports = function(grunt) {
  grunt.config.set("jasmine", {
    src: {
      src: "src/**/*.js",
      options: {
        specs: "test/js/**/*.js",
        helpers: "test/js-imagediff/imagediff.js",
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jasmine");
};