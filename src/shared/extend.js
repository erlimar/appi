    /**
     * extend
     *
     * Extende as propriedades de um objeto.
     *
     * @param obj       Objeto a ser extendido
     * @param props     Propriedades que extenderão o objeto.
     */
    function extend(obj, props) {
        // TODO: Verificar se os parâmetros são OBJECT
        for(var prop in props)
            obj[prop] = props[prop];
    };