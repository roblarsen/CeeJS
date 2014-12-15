"use strict";

module.exports = function(grunt) {
  grunt.config.set("copy", {
    options: {
      process: function(content, srcpath) {
        return grunt.template.process("<%= uglify.options.banner%>") +
          content;
      }
    },
    dist: {
      src: "src/Cee.js",
      dest: "./Cee.js",
    },
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
};