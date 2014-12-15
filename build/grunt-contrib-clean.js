"use strict";

module.exports = function(grunt) {
  grunt.config.set("clean", {
    dist: ["Cee.js", "Cee.min.js", "docs"],
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
};