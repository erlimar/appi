    'use strict';

    var $root = root;

    /**
     * Construtor
     */
    function Appi(){
    };

    Appi.prototype= {
        constructor: Appi,
        // Preserva qualquer declaração anterior de "appi". A mesma estará
        // disponível em "appi.appi".
        appi: $root.appi
    };

    // Configurações do setup
    var settings_ = {};

    // Variáveis de ambiente
    var environment_ = [];