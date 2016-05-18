    /**
     * appi.ARGS.string
     *
     * @description
     *
     * Cria a definição de um argumento que aceita dados do tipo string.
     */
    function ARGSTypeString(defaultValue){
        return {
            accept: function(value){
                return isString(value);
            },
            getValue: function(value){
                return value;
            },
            hasDefault: !isUndefined(defaultValue),
            default: defaultValue
        }; 
    }