    /**
     * appi.isNumber
     *
     * @description
     *
     * Verifica se um objeto/variável é um número.
     *
     * @param varObject Qualquer identificador de variável
     */
    function isNumber(varObject) {
        return (typeof varObject === typeof 0 || varObject instanceof Number);
    };