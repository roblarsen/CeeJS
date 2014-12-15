"use strict";

module.exports = function(grunt) {
  grunt.config.set("jsdoc", {
    dist: {
      src: ["src/*.js"],
      options: {
        destination: "docs"
      }
    },
  });

  grunt.loadNpmTasks("grunt-jsdoc");
};