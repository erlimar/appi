    /**
     * appi.ARGS.object
     *
     * @description
     *
     * Cria a definição de um argumento que aceita dados do tipo object.
     */
    function ARGSTypeObject(defaultValue){
        return {
            accept: function(value){
                return isObject(value);
            },
            getValue: function(value){
                return value;
            },
            hasDefault: !isUndefined(defaultValue),
            default: defaultValue
        }; 
    }