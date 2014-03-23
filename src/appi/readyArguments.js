    /**
     * appi.readyArguments
     *
     * @description
     *
     * Cria um objeto com propriedades que referenciam os argumentos de uma
     * função
     *
     * @param {Arguments} objectArguments   Objeto com os argumentos
     * @param {object} typeDefs             Definição de tipos dos argumentos
     *
     * @return {object} Objeto com propriedades referentes aos argumentos
     */
    function readyArguments(objectArguments, typeDefs) {
        if (arguments.length !== 2)
            throw 'appi.readyArguments argument signature is invalid';

        if(appi.isUndefined(objectArguments.length))
            throw 'appi.readyArguments @objectArguments is invalid';

        if (typeof typeDefs != 'object')
            throw 'appi.readyArguments @typeDefs is invalid';

        var result_ = {};

        var counter_ = 0;
        for(var index in typeDefs) {
            var typeDef = typeDefs[index];

            if(!isFunction(typeDef.accept) 
            || !isFunction(typeDef.getValue) 
            || !isBoolean(typeDef.hasDefault))
                throw 'appi.readyArguments @typeDefs.' + index + ' is invalid';

            if(counter_ < objectArguments.length) {
                if(!typeDef.accept(objectArguments[counter_]))
                    throw 'Argument @' + index + ' is invalid';
                result_[index] = typeDef.getValue(objectArguments[counter_]);
            }

            if(counter_ >= objectArguments.length) {
                if(!typeDef.hasDefault)
                    throw 'Argument @' + index + ' is required';
                result_[index] = typeDef.getValue(typeDef.default);
            }

            counter_++;
        }

        return result_;
    };