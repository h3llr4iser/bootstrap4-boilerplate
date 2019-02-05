// grunt configuration
module.exports = function (grunt) {
	grunt.initConfig({
		// notifications
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "Project Name", // defaults to the name in package.json, or will use project directory's name
				success: false, // whether successful grunt executions should be notified automatically
				duration: 3 // the duration of notification in seconds, for `notify-send only
			}
		},
		notify: {
			watchjs: {
				options: {
					title: 'JavaScript Build Complete',  // optional
					message: 'script.js created', // required
				}
			},
			watchcss: {
				options: {
					title: 'CSS Build Complete',  // optional
					message: 'style.css created', // required
				}
			},
			watchhtml: {
				options: {
					title: 'HTML Build Complete',  // optional
					message: 'HTML files created', // required
				}
			},
			build: {
				options: {
					title: 'Grunt Build Complete', // optional
					message: 'Build files created', // required
				}
			}
		},
		// compile javascript
		jshint: {
			files: [
				'gruntfile.js',
				'src/javascript/project.js'
			],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		concat: {
			options: {
				stripBanners: true
			},
			dist: {
				src: [
					// 'node_modules/jquery/dist/jquery.js', // @url http://jquery.com/
					'node_modules/jquery/dist/jquery.slim.js', // @url http://jquery.com/

					'node_modules/popper.js/dist/umd/popper.js', // @url https://popper.js.org/

					// 'node_modules/bootstrap/dist/js/bootstrap.js', // @url http://getbootstrap.com/

					// bootstrap 4 javascript files
					'node_modules/bootstrap/js/dist/util.js',
					'node_modules/bootstrap/js/dist/index.js',
					'node_modules/bootstrap/js/dist/alert.js',
					'node_modules/bootstrap/js/dist/button.js',
					'node_modules/bootstrap/js/dist/carousel.js',
					'node_modules/bootstrap/js/dist/collapse.js',
					'node_modules/bootstrap/js/dist/dropdown.js',
					'node_modules/bootstrap/js/dist/modal.js',
					// 'node_modules/bootstrap/js/dist/popover.js',
					'node_modules/bootstrap/js/dist/scrollspy.js',
					'node_modules/bootstrap/js/dist/tab.js',
					'node_modules/bootstrap/js/dist/toast.js',
					// 'node_modules/bootstrap/js/dist/tooltip.js',

					// 'src/javascript/plugins/equalheights.js', // equal heights plugin
					// 'src/javascript/plugins/smoothscroll.js', // smooth scroll plugin
					// 'src/javascript/plugins/affixfooter.js', // affix footer plugin

					'src/javascript/project.js'
				],
				dest: 'js/script.js'
			}
		},
		uglify: {
			files: {
				src: 'js/script.js', // source files mask
				dest: 'js/', // destination folder
				expand: true, // allow dynamic building
				flatten: true, // remove all unnecessary nesting
				ext: '.min.js' // replace .js to .min.js
			}
		},
		sass: {
			dist: {
				options: {
					debugInfo: false,
					style: 'expanded',
					lineNumbers: false,
					sourcemap: 'none',
					noCache: true
				},
				files: {
					'css/style.css': 'src/sass/style.scss'
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				keepSpecialComments: 0
			},
			target: {
				files: {
					'css/style.min.css': 'css/style.css'
				}
			}
		},
		// watch for changes
		watch: {
			js: {
				files: 'src/javascript/project.js',
				tasks: [ 'jshint', 'concat', 'uglify', 'notify:watchjs' ]
			},
			css: {
				files: 'src/sass/**/*.scss',
				tasks: [ 'sass', 'cssmin', 'notify:watchcss' ]
			},
			html: {
				files: 'src/html/**/*.html',
				tasks: [ 'includereplace', 'notify:watchhtml' ]
			}
		},
		// compile html
		includereplace: {
			dist: {
				files: [
					{
						src: ['**/*.html', '!**/includes/**', '!**/tracking/**', '!**/_examples/**'],
						dest: './',
						expand: true,
						cwd: 'src/html/'
					}
				]
			}
		}
	});

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-include-replace');

	// register tasks
	grunt.task.run('notify_hooks');
	grunt.registerTask('default', [ 'watch', 'jshint', 'concat', 'sass', 'cssmin', 'uglify', 'includereplace', 'notify:build' ]);
	grunt.registerTask('build', [ 'jshint', 'concat', 'sass', 'cssmin', 'uglify', 'includereplace', 'notify:build' ]);

};
