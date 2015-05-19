module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    build: {
      src: 'build/<%= pkg.name %>.js',
      dest: 'build/ <%= pkg.name %>.min.js'
    }      
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['uglify']);

};
