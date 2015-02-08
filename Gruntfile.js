module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		stylus: {
			development: {
				options: {
					paths: ["./css"],
					yuicompress: true
				},
				files: {
					"./public/css/main.css": "./public/css/main.styl"
				}
			}
		},
		// running `grunt watch` will watch for changes
		watch: {
			files: "./public/css/*.styl",
			tasks: ["stylus"]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-concat');

	 grunt.registerTask('default', ["stylus"]);

};
