"use strict"

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                dest: 'dist/<%= pkg.name %>.js'
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
                dest: 'dist/<%= pkg.modules.test.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: grunt.file.read('src/appi.banner')
            },
            appi: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.appi.dest %>']
                }
            },
            appiTest: {
                files: {
                    'dist/<%= pkg.modules.test.name %>.min.js': ['<%= concat.appiTest.dest %>']
                }
            }
        },
        watch: {
            files: ['src/**', 'package.json', 'Gruntfile.js'],
            tasks: ['default']
        }
    });

    grunt.registerTask('default', [
        'concat',
        'uglify',
        'watch'
    ]);
};