"use strict";

module.exports = function(grunt) {
  grunt.config.set("watch", {
    jshintrc: {
      files: ["**/.jshintrc"],
      tasks: ["jshint"],
    },
    jscsrc: {
      files: [ "**/.jscsrc"],
      tasks: ["jscs"],
    },
    build: {
      files: ["<%= jshint.build.src %>"],
      tasks: ["jscs", "jshint:build"],
    },
    scripts: {
      files: ["<%= jshint.src.src %>"],
      tasks: ["jscs", "jshint:src"],
    },
    tests: {
      files: ["test/unit/**/*"],
      tasks: ["jscs", "jshint:test", "test"],
    },
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
};