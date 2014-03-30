    'use strict';

    var $root = root;

    if(!$root.AppiCore)
        throw '@AppiCore required';

    var $core = new $root.AppiCore();
    var $session; // Iniciado em install()

    /**
     * Construtor
     */
    function AppiTest(){
    };

    AppiTest.prototype= {
        constructor: AppiTest
    };