    /**
     * Cenario
     *
     * Objeto de cenario
     */
    function Scenario(){
        $core.extend(this, $core.readyArguments(arguments, {
            'name':         $core.ARGS.string(null),
            'description':  $core.ARGS.string(null),
            'premisses':    $core.ARGS.array([]),
            'environment':  $core.ARGS.any(null),
            'setup':        $core.ARGS.function(function(){ return {}; })
        }));
    };

    Scenario.prototype = {
        constructor: Scenario,

        /**
         * Adiciona uma premissa ao cenário, e retorna-a.
         */
        addPremisse: function(premisseName, premisseCallback) {
            var premisse_ = new Premisse(premisseName, premisseCallback);
            this.premisses.push(premisse_);
            return premisse_;
        }
    };