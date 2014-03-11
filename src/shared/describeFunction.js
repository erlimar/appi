    /**
     * appi.describeFunction
     *
     * @description
     *
     * Descreve/Deserializa uma função, identificando seu nome e parâmetros
     * declarados.
     *
     * @param funcObject Objeto de função para descrever.
     *
     * @return {object} IFunctionDescritor da função
     *
     * interface IFunctionDescriptor {
     *
     *      [string] name
     *      --------------
     *      Nome da função. Ou null se for uma função anônima.
     *
     *      [Array] params
     *      --------------
     *      Lista com nome dos parâmetros.
     * }
     */
    function describeFunction(funcObject) {
        if(!isFunction(funcObject))
            throw 'appi.describeFunction @funcObject param is not a function';

        var string_ =  funcObject.toString();

        var regex_ = /^function\s([a-z0-9\_]*)\(([a-z0-9\_\s,\$]*)\)[\{]*/gim;
        var match_ = regex_.exec(string_);

        if(match_ == null)
            throw 'appi.describeFunction pattern without result';

        var descriptor_ = {
            name: match_[1] || null,
            params: match_[2].split(',')
        };

        for(var i in descriptor_.params)
            descriptor_.params[i] = descriptor_.params[i].trim();

        return descriptor_;
    };