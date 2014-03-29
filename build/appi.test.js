///
/// @module appi.test
/// Appi JavaScript Library (Unit Test module)
///
/// Este módulo foi criado especificamente para prover uma forma mais simples
/// de utilizar testes unitários no processo de desenvolvimento, especificamente
/// no processo de desenvolvimento da biblioteca "Appi".
///
(function(root, undefined) {
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

    /**
     * Cenario
     *
     * Objeto de cenario
     */
    function Cenario(){
        extend(this, appi.readyArguments(arguments, {
            'name':         appi.ARGS.string(null),
            'description':  appi.ARGS.string(null),
            'premisses':    appi.ARGS.array([]),
            'environment':  appi.ARGS.any(null),
            'setup':        appi.ARGS.function(function(){ return {}; })
        }));
    };

    Cenario.prototype = {
        constructor: Cenario,
        
        name: null,
        description: null,
        premisses: [],
        environment: null,
        setup: null
    };

    /**
     * Component
     *
     * Objeto de component
     */
    function Component(){
        extend(this, appi.readyArguments(arguments, {
            'name':     appi.ARGS.string(),
            'callback': appi.ARGS.array()
        }));
    };

    Component.prototype = {
        constructor: Component,

        name: null,
        cenarios: []
    };

    /**
     * Premisse
     *
     * Objeto de premissa
     */
    function Premisse(){
        extend(this, appi.readyArguments(arguments, {
            'name':     appi.ARGS.string(),
            'callback': appi.ARGS.function()
        }));
    };

    Premisse.prototype = {
        constructor: Premisse,

        name: null,
        callback: null
    };

    /**
     * Session
     *
     * Objeto de sessão
     */
    function Session(){
        extend(this, appi.readyArguments(arguments, {
            'components': appi.ARGS.array()
        }));
    };

    Session.prototype = {
        constructor: Session,

        components: []
    };

    /**
     * install
     *
     * Instala o módulo no escopo ROOT.
     */
    function install() {
        if(!$root.appi)
            throw '@appi is required';
        
        // Instancia um objeto de AppiTest como 'appi.test'
        $root.appi.test = new AppiTest();
        // Publica os objetos e funções na instância criada
        $core.extend($root.appi.test, {
            'unit': unit
        });
    }

    /**
     * appi.test.unit
     *
     * Define um cenário para teste unitário.
     */
    function unit() {
        appi.trace('unit call...')
    }

    install();

})(window);
