    /**
     * appi.ARGS.array
     *
     * @description
     *
     * Cria a definição de um argumento que aceita dados do tipo Array.
     */
    function ARGSTypeArray(defaultValue){
        return {
            accept: function(value){
                return isArray(value);
            },
            getValue: function(value){
                return value;
            },
            hasDefault: !isUndefined(defaultValue),
            default: defaultValue
        };
    }