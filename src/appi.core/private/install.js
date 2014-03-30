    /**
     * install
     *
     * Instala o módulo no escopo ROOT. Isso irá disponibilizar o tipo AppiCore
     * no escopo principal do programa.
     */
    function install() {
        if(!$root.AppiCore)
            $root.AppiCore = AppiCore;

        if($root.AppiCore && $root.AppiCore !== AppiCore)
            throw '@AppiCore has defined to a invalid type';
        
        extend(AppiCore.prototype, {
            'ARGS': {
                'any': ARGSTypeAny,
                'array': ARGSTypeArray,
                'function': ARGSTypeFunction,
                'string': ARGSTypeString
            },
            'describeFunction': describeFunction,
            'extend': extend,
            'isArray': isArray,
            'isBoolean': isBoolean,
            'isFunction': isFunction,
            'isNumber': isNumber,
            'isString': isString,
            'isDefined': isDefined,
            'isUndefined': isUndefined,
            'isObject': isObject,
            'isDate': isDate,
            'isRegExp': isRegExp,
            'readyArguments': readyArguments
        });
    }