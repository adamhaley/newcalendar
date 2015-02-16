module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		stylus: {
			development: {
				options: {
					paths: ["./css"],
					yuicompress: true,
					define: {
						import_tree: require('stylus-import-tree')
					}
				},
				files: {
					"./public/css/main.css": "./public/styl/main.styl"
				}
			}
		},
		watch: {
			files: ["./public/styl/main.styl","./public/styl/*.styl", "./public/styl/**/*.styl"],
			tasks: ["stylus"]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.registerTask('default', ["stylus","watch"]);
	grunt.registerTask('prod', ["stylus"]);
};
