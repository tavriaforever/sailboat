module.exports = function(grunt){
    grunt.initConfig({
        jade: {
            compile: {
                files: [{
                    cwd: 'source',
                    src: ['**/*.jade', '!partials/**/*.jade'],
                    dest: 'dest',
                    expand: true,
                    ext: '.html'
                }]
            },
            options: {
                pretty: true
            }
        },
        stylus: {
            compile: {
                files: [{
                    cwd: 'source/styl',
                    src: '**/*.styl',
                    dest: 'source/css',
                    expand: true,
                    ext: '.css'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'source/i',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dest/i'
                }]
            }
        },
//        copy: {
//            css: {
//                files: [{
//                    cwd: 'source/css',
//                    src: ['**/*.css'],
//                    dest: 'dest/css',
//                    expand: true
//                }]
//            },
//            js: {
//                files: [{
//                    cwd: 'source/js',
//                    src: ['**/*.js'],
//                    dest: 'dest/js',
//                    expand: true
//                }]
//            }
//        },
        concat: {
            css: {
                files: [{
                    src: 'source/css/*.css',
                    dest: 'dest/css/app.css'
                }]
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: ['dest/**/*']
            },
//            js: {
//                files: ['source/js/**/*.js'],
//                tasks: ['copy:js']
//            },
            css: {
                files: ['source/css/*.css'],
                tasks: ['concat']
            },
            jade: {
                files: ['source/**/*.jade', '!partials/**/*.jade'],
                tasks: ['jade']
            },
            stylus: {
                files: ['source/styl/**/*.styl'],
                tasks: ['stylus']
            },
            imagemin: {
                files: ['source/i/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        },
        connect: {
            server: {
                options: {
                    port: 3020,
                    base: 'dest'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', [
        'connect',
        'jade',
        'stylus',
        'imagemin',
        'concat',
        'watch'
    ]);
};
