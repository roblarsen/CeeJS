"use strict";

module.exports = function(grunt) {
  grunt.config.set("gh-pages", {
    options: {
      base: "./",
    },
    src: ["**"],
  });

  grunt.loadNpmTasks("grunt-gh-pages");
};