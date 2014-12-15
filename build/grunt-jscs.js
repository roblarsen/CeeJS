"use strict";

module.exports = function(grunt) {
  grunt.config.set("jscs", {
    options: {
      config: ".jscsrc",
    },
    src: [
      "<%= jshint.build.src %>",
      "<%= jshint.src.src %>",
      "<%= jshint.test.src %>",
    ],
  });

  grunt.loadNpmTasks("grunt-jscs");
};