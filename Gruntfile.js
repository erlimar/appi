"use strict"

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.initConfig({
        distPath: './dist',
        pkg: grunt.file.readJSON('package.json'),
        modules: grunt.file.readJSON('modules.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            appi: {
                options: {
                    banner: grunt.file.read('src/appi.prefix'),
                    footer: grunt.file.read('src/appi.sufix')
                },
                src: [
                    'src/Appi.js', 
                    'src/appi/private/*.js',
                    'src/shared/*.js',
                    'src/appi/*.js'
                ],
                dest: '<%= distPath %>/<%= pkg.name %>.js'
            },
            appiTest: {
                options: {
                    banner: grunt.file.read('src/appi.test.prefix'),
                    footer: grunt.file.read('src/appi.test.sufix')
                },
                src: [
                    'src/AppiTest.js',
                    'src/appi.test/private/*.js',
                    'src/shared/*.js',
                    'src/appi.test/*.js'
                ],
                dest: '<%= distPath %>/<%= modules.test.name %>.js'
            }
        },
        uglify: {
            appi: {
                options: {
                    banner: grunt.file.read('src/appi.banner')
                },
                files: {
                    '<%= distPath %>/<%= pkg.name %>.min.js': ['<%= concat.appi.dest %>']
                }
            },
            appiTest: {
                options: {
                    banner: grunt.file.read('src/appi.test.banner')
                },
                files: {
                    '<%= distPath %>/<%= modules.test.name %>.min.js': ['<%= concat.appiTest.dest %>']
                }
            }
        },
        watch: {
            files: ['src/**', 'package.json', 'modules.json', 'Gruntfile.js'],
            tasks: ['default']
        },
        ngdocs: {
            options: {
                dest: '<%= distPath %>/docs',
                html5Mode: true,
                startPage: '/api',
                title: "Appi Docs",
                titleLink: "/appi-docs/api",
                bestMatch: true
            },
            tutorial: {
                src: ['doc/tutorial/*.ngdoc'],
                title: 'Tutorial'
            },
            api: {
                src: ['src/**/*.js'],
                title: 'API Documentation'
            }
        }
    });

    grunt.registerTask('default', [
        'concat',
        'uglify',
        /*'ngdocs',*/
        'watch'
    ]);
};