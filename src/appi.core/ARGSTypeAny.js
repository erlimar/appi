    /**
     * appi.ARGS.any
     *
     * @description
     *
     * Cria a definição de um argumento que aceita qualquer tipo de dado.
     */
    function ARGSTypeAny(defaultValue){
        return {
            accept: function(){
                return true;
            },
            getValue: function(value){
                return value;
            },
            hasDefault: true,
            default: undefined
        };
    };
