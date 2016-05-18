    'use strict';

    var $root = root;

    if(!$root.AppiCore){
        throw '@AppiCore required';
    }

    var $core = new $root.AppiCore();

    /**
     * Construtor
     */
    function Appi(){
    }

    Appi.prototype= {
        constructor: Appi,
        // Preserva qualquer declaração anterior de "appi". A mesma estará
        // disponível em "appi.appi".
        appi: $root.appi
    }

    // Configurações do setup
    var settings_ = {};

    // Variáveis de ambiente
    var environment_ = [];