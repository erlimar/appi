    /**
     * appi.isFunction
     *
     * @description
     *
     * Verifica se um objeto/variável é uma função.
     *
     * @param varObject Qualquer identificador de variável
     */
    function isFunction(varObject) {
        return (typeof varObject === typeof function () { });
    };