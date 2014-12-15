"use strict";

module.exports = function(grunt) {
  grunt.config.set("jshint", {
    build: {
      options: {
        jshintrc: ".jshintrc",
      },
      src: ["*.js", "build/**/*.js"],
    },
    src: {
      options: {
        jshintrc: "src/.jshintrc",
      },
      src: "src/**/*.js",
    },
    test: {
      options: {
        jshintrc: "test/.jshintrc"
      },
      src: "test/js/*.js",
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
};