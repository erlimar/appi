    /**
     * appi.isObject
     *
     * @description
     *
     * Verifica se um objeto/variável é do tipo Object.
     *
     * Seguindo o princípio de que Object é o tipo primitivo de qualquer outro
     * tipo de objeto, "retiramos" da lista alguns tipos primitivos fornecidos
     * como "builtin" no JavaScript.
     *
     * São eles: [Array, Date, Number, Boolean, RegExp]
     *
     * @param varObject Qualquer identificador de variável
     */
    function isObject(varObject) {
        return (typeof varObject === 'object'
            && !isArray(varObject)
            && !isDate(varObject)
            && !isNumber(varObject)
            && !isBoolean(varObject)
            && !isRegExp(varObject));
    };