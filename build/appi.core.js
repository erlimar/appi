///
/// @module appi.core
/// Appi JavaScript Library (Core module)
///
/// Base de dependências compartilhadas onde a biblioteca APPI e seus módulos são
/// construídos.
///
(function(root, undefined) {
    'use strict';

    var $root = root;

    /**
     * Construtor
     */
    function AppiCore(){
    };

    AppiCore.prototype= {
        constructor: AppiCore
    };

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
            'readyArguments': readyArguments
        });
    }

    /**
     * appi.ARGS.any
     *
     * @description
     *
     * Cria a definição de um argumento que aceita qualquer tipo de dado.
     */
    function ARGSTypeAny(defaultValue){
        return {
            accept: function(){
                return true;
            },
            getValue: function(value){
                return value;
            },
            hasDefault: true,
            default: undefined
        };
    };


    /**
     * appi.ARGS.array
     *
     * @description
     *
     * Cria a definição de um argumento que aceita dados do tipo Array.
     */
    function ARGSTypeArray(defaultValue){
        return {
            accept: function(value){
                return isArray(value);
            },
            getValue: function(value){
                return value;
            },
            hasDefault: !isUndefined(defaultValue),
            default: defaultValue
        };
    };

    /**
     * appi.ARGS.function
     *
     * @description
     *
     * Cria a definição de um argumento que aceita dados do tipo function.
     */
    function ARGSTypeFunction(defaultValue){
        return {
            accept: function(value){
                return isFunction(value);
            },
            getValue: function(value){
                return value;
            },
            hasDefault: !isUndefined(defaultValue),
            default: defaultValue
        };
    };

    /**
     * appi.ARGS.string
     *
     * @description
     *
     * Cria a definição de um argumento que aceita dados do tipo string.
     */
    function ARGSTypeString(defaultValue){
        return {
            accept: function(value){
                return isString(value);
            },
            getValue: function(value){
                return value;
            },
            hasDefault: !isUndefined(defaultValue),
            default: defaultValue
        }; 
    };

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

    /**
     * extend
     *
     * Extende as propriedades de um objeto.
     *
     * @param obj       Objeto a ser extendido
     * @param props     Propriedades que extenderão o objeto.
     */
    function extend(obj, props) {
        // TODO: Fazer verificações de segurança. Um bom caminho é a função de
        //       mesmo nome disponível na biblioteca AngularJS
        for(var prop in props)
            obj[prop] = props[prop];
    };

    /**
     * appi.isArray
     *
     * @description
     *
     * Verifica se um objeto/variável é um Array.
     *
     * @param varObject Qualquer identificador de variável
     */
    function isArray(varObject) {
        return (Array.isArray(varObject));
    };

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

        if(!is_ && isString(varObject))
            is_ = ['true', 'false'].indexOf(varObject.toLowerCase()) >= 0;

        if(!is_ && isNumber(varObject))
            is_ = varObject == 0 || varObject == 1;
        
        return is_;
    };

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

    /**
     * appi.isString
     *
     * @description
     *
     * Verifica se um objeto/variável é uma string.
     *
     * @param varObject Qualquer identificador de variável
     */
    function isString(varObject) {
        return (typeof varObject === typeof '');
    };

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
    };

    /**
     * appi.readyArguments
     *
     * @description
     *
     * Cria um objeto com propriedades que referenciam os argumentos de uma
     * função.
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

    install();

})(window);
