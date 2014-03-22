    /**
     * extend
     *
     * Extende as propriedades de um objeto.
     *
     * @param obj       Objeto a ser extendido
     * @param props     Propriedades que extenderão o objeto.
     */
    function extend(obj, props) {
        // TODO: Fazer verificações de segurança
        for(var prop in props)
            obj[prop] = props[prop];
    };