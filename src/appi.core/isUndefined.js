    /**
     * appi.isUndefined
     *
     * @description
     *
     * Verifica se um objeto/variável é indefinido.
     *
     * Existem várias formas de se verificar se um determinado
     * identificador está definido no escopo JavaScript, esta
     * função garante o melhor uso, além de simplificar o trabalho.
     *
     * @param varObject Qualquer identificador de variável
     */
    function isUndefined(varObject) {
        return (typeof varObject === typeof undefined);
    }