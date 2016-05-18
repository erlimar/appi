"use strict"

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.initConfig({
        buildPath: './build',
        distPath: './dist',
        pkg: grunt.file.readJSON('package.json'),
        modules: grunt.file.readJSON('modules.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            appiCore: {
                options: {
                    banner: grunt.file.read('appi.module.core.prefix'),
                    footer: grunt.file.read('appi.module.sufix')
                },
                src: [
                    'src/AppiCore.js', 
                    'src/appi.core/private/*.js',
                    'src/appi.core/*.js'
                ],
                dest: '<%= buildPath %>/<%= modules.core.name %>.js'
            },
            appiMain: {
                options: {
                    banner: grunt.file.read('appi.module.main.prefix'),
                    footer: grunt.file.read('appi.module.sufix')
                },
                src: [
                    'src/Appi.js', 
                    'src/appi/private/*.js',
                    'src/appi/*.js'
                ],
                dest: '<%= buildPath %>/<%= pkg.name %>.js'
            },
            appiTest: {
                options: {
                    banner: grunt.file.read('appi.module.test.prefix'),
                    footer: grunt.file.read('appi.module.sufix')
                },
                src: [
                    'src/AppiTest.js',
                    'src/appi.test/private/*.js',
                    'src/appi.test/*.js'
                ],
                dest: '<%= buildPath %>/<%= modules.test.name %>.js'
            },
            appiTestViewerHtml: {
                options: {
                    banner: grunt.file.read('appi.module.test.viewer.html.prefix'),
                    footer: grunt.file.read('appi.module.sufix')
                },
                src: [
                    'src/appi.test.viewer/appiTestViewerHtml.js',
                    'src/appi.test.viewer/html/private/*.js',
                    'src/appi.test.viewer/html/*.js'
                ],
                dest: '<%= distPath %>/<%= modules.test.viewer.html.name %>.js'
            },
            appiDist: {
                options: {
                    banner: grunt.file.read('appi.dist.banner')
                },
                src: [
                    '<%= concat.appiCore.dest %>',
                    '<%= concat.appiMain.dest %>',
                    '<%= concat.appiTest.dest %>'
                ],
                dest: '<%= distPath %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            appi: {
                options: {
                    banner: grunt.file.read('appi.dist.min.banner')
                },
                files: {
                    '<%= distPath %>/<%= pkg.name %>.min.js': ['<%= concat.appiDist.dest %>']
                }
            },
            appiTestViewerHtml: {
                options: {
                    banner: grunt.file.read('appi.dist.component.min.banner')
                },
                files: {
                    '<%= distPath %>/<%= modules.test.viewer.html.name %>.min.js': ['<%= concat.appiTestViewerHtml.dest %>']
                }
            }
        },
        watch: {
            files: ['src/**', '*.banner', '*.prefix', '*.sufix', 'package.json', 'modules.json', 'Gruntfile.js'],
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

    grunt.registerTask('default', ['concat', 'uglify', 'ngdocs']);
};