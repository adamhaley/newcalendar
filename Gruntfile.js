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
					"./css/main.css": "./css/main.less"
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: './css/',
				src: ['main.css'],
				dest: './css'
			}
		},
		concat: {
	      options: {
	        separator: ';'
	      },
	      dist: {
	        src: ['js/vendor/jquery/dist/jquery.js','js/vendor/bootstrap/js/modal.js','js/vendor/bootstrap/js/carousel.js','js/vendor/bootstrap/js/collapse.js','js/main.js'],
	        dest: 'dist/<%= pkg.name %>.js'
	      }
	    },
	    uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	      },
	      dist: {
	        files: {
	          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
	        }
	      }

	    },
    	jshint: {
	      files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
	      options: {
	        // options here to override JSHint defaults
	        globals: {
	          jQuery: true,
	          console: true,
	          module: true,
	          document: true
	        }
	      }
	    },
		// running `grunt watch` will watch for changes
		watch: {
			files: "./css/*.less",
			tasks: ["less"/*, "cssmin"*/]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	 grunt.registerTask('default', ["concat","uglify","cssmin"]);

};
