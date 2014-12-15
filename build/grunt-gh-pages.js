"use strict";

module.exports = function(grunt) {
  grunt.config.set("gh-pages", {
    options: {
      base: "./",
    },
    src: ["**","!**/node_modules/**"],
  });

  grunt.loadNpmTasks("grunt-gh-pages");
};