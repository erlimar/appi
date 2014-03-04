/**
 * Appi Test JavaScript Library v0.0.1
 *
 * Biblioteca para testes unitários no processo de desenvolvimento de 
 * Appi JavaScript Library v0.0.1.
 *
 * Copyright (c) 2014 Erlimar Silva Campos http://erlimar.com
 * Copyright (c) 2014 Eh Sistemas de Informática http://www.ehsistemas.com.br
 */
+function (scope, undefined) {
    'use strict';

    var __appitest__ = {};

    // Interface publica de appi.test
    if(typeof scope['appi'] === typeof undefined)
        scope['appi'] = {};

    if(typeof scope['appi']['test'] !== typeof undefined)
        throw '@appi.test has defined';

    scope['appi']['test'] = __appitest__;
}(window)