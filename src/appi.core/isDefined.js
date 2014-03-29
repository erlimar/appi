    /**
     * appi.isDefined
     *
     * @description
     *
     * Verifica se um objeto/variável está definido.
     *
     * Existem várias formas de se verificar se um determinado
     * identificador está definido no escopo JavaScript, esta
     * função garante o melhor uso, além de simplificar o trabalho.
     *
     * @param varObject Qualquer identificador de variável
     */
    function isDefined(varObject) {
        return (typeof varObject !== typeof undefined);
    };