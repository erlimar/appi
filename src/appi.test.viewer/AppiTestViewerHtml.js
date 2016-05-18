    'use strict';

    var $root = root;

    if(!$root.appi || !$root.appi.test) {
        throw '@AppiTest is required';
    }

    var $test = $root.appi.test;
