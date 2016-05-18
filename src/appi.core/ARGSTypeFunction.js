    /**
     * appi.ARGS.function
     *
     * @description
     *
     * Cria a definição de um argumento que aceita dados do tipo function.
     */
    function ARGSTypeFunction(defaultValue){
        return {
            accept: function(value){
                return isFunction(value);
            },
            getValue: function(value){
                return value;
            },
            hasDefault: !isUndefined(defaultValue),
            default: defaultValue
        };
    }