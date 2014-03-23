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