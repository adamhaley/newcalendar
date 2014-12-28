module.exports = function(grunt) {
	grunt.initConfig({
		// running `grunt less` will compile once
		pkg: grunt.file.readJSON("package.json"),
		less: {
			development: {
				options: {
					paths: ["./css"],
					yuicompress: true
				},
				files: {
					"./public/css/main.css": "./public/css/main.less"
				}
			}
		},
		// running `grunt watch` will watch for changes
		watch: {
			files: "./public/css/*.less",
			tasks: ["less"/*, "cssmin"*/]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-concat');

	 grunt.registerTask('default', ["less"]);

};
