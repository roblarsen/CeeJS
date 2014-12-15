"use strict";

module.exports = function(grunt) {
  grunt.config.set("rename", {
    dist: {
      src: "docs/Cee.js_.html",
      dest: "docs/Cee.js.html"
    },
  });

  grunt.loadNpmTasks("grunt-rename");
};