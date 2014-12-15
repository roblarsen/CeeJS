"use strict";

module.exports = function(grunt) {
  grunt.config.set("uglify", {
    options: {
      banner:
        "/**\n" +
        " * <%= pkg.name %> v<%= pkg.version %>\n" +
        " *\n" +
        " * <%= pkg.homepage %>\n" +
        " *\n" +
        " * Copyright <%= pkg.licenseYear %>, <%= pkg.author %>\n" +
        " *\n" +
        " * <%= pkg.license %> license <%= pkg.licenseURI %>\n" +
        " *\n" +
        " * build: " + Date.now() + "\n" +
        " *\n" +
        " */\n" +
        "\n",
    },
    dist: {
      files:{
        "Cee.min.js": ["src/Cee.js"],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
};