module.exports = function(grunt){
    grunt.initConfig({
        jade: {
            compile: {
                files: [
                    {
                        cwd: 'source',
                        src: ['**/*.jade', '!partials/**/*.jade'],
                        dest: 'dest',
                        expand: true,
                        ext: '.html'
                    }
                ]
            },
            options: {
                pretty: true
            }
        },
        stylus: {
            compile: {
                files: [
                    {
                        cwd: 'source/styl',
                        src: ['**/*.styl'],
                        dest: 'source/css',
                        expand: true,
                        ext: '.css'
                    }
                ]
            }
        },
        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'source/i',
                        src: ['**/*.{png,jpg,gif,ico}'],
                        dest: 'dest/i'
                    }
                ]
            }
        },
        copy: {
            js: {
                files: [{
                    cwd: 'source/js',
                    src: ['app.js'],
                    dest: 'dest/js',
                    expand: true
                }]
            }
        },
        concat: {
            js: {
                files: [{
                        src: [
                            'source/js/libs/jQuery-One-Page-Nav/jquery.nav.js',
                            'source/js/libs/galereya/src/js/jquery.galereya.js',
                            'source/js/libs/jquery.browser/dist/jquery.browser.js'
                        ],
                        dest: 'dest/js/libs.js'
                }]
            },
            css: {
                files: [
                    {
                        src: 'source/css/*.css',
                        dest: 'dest/css/app.css'
                    }
                ]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'source/i',
                    src: ['**/*.svg'],
                    dest: 'dest/i'
                }]
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: false
                },
                files: ['dest/**/*']
            },
            css: {
                files: ['source/css/*.css'],
                tasks: ['concat:css']
            },
            js: {
                files: ['source/js/app.js', 'source/js/**/*.js'],
                tasks: ['copy:js', 'concat:js']
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
            },
            svgmin: {
                files: ['source/i/**/*.svg'],
                tasks: ['svgmin']
            }
        }
//        connect: {
//            server: {
//                options: {
//                    port: 3020,
//                    base: 'dest'
//                }
//            }
//        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-svgmin');

    grunt.registerTask('default', [
//        'connect',
        'jade',
        'stylus',
        'copy',
        'imagemin',
        'svgmin',
        'concat',
        'watch'
    ]);
};
