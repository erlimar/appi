    /**
     * appi.isBoolean
     *
     * @description
     *
     * Verifica se um objeto/variável é um valor BOOLEAN.
     *
     * @param varObject Qualquer identificador de variável
     */
    function isBoolean(varObject) {
        var is_ = (typeof varObject === typeof true);

        if(!is_)
            is_ = varObject instanceof Boolean;

        if(!is_ && isString(varObject))
            is_ = ['true', 'false'].indexOf(varObject.toLowerCase()) >= 0;

        if(!is_ && isNumber(varObject))
            is_ = varObject == 0 || varObject == 1;
        
        return is_;
    }