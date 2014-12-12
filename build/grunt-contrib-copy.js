"use strict";

module.exports = function(grunt) {
  grunt.config.set("copy", {
    dist: {
      src: "src/Cee.js",
      dest: "./Cee.js",
      options: {
        process: function(content, srcpath) {
          return grunt.template.process("<%= uglify.options.banner%>") +
            content;
        }
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
};