    'use strict';

    var $root = root;

    if(!$root.AppiCore)
        throw '@AppiCore required';

    var $core = new $root.AppiCore();

    /**
     * Construtor
     */
    function AppiTest(){
    };

    AppiTest.prototype= {
        constructor: AppiTest
    };