    /**
     * appi.setup
     * 
     * @description
     *
     * Realiza o setup da aplicação
     *
     * @param {object} ISettings     Configurações do Setup com a seguinte interface.
     *
     *   interface ISettings {
     *      [object] scope
     *      --------------
     *      Objeto de escopo do aplicativo. Normalemente 'window'
     *
     *      [string] appName (opcional)
     *      ----------------
     *      Nome do aplicativo, seguindo os padrões de nome para identificadores
     *      JavaScript. Este será o nome disponível no escopo da aplicação. Que
     *      retornará a interface do aplicativo. Se um nome não for informado,
     *      'App' será considerado.
     *
     *      [object] appMock (opcional)
     *      ----------------
     *      Objeto Mock do aplicativo, para uso no momento do desenvolvimento.
     *      Este objeto substituirá o objeto 'builtin' durante a fase de 
     *      desenvolvimento. O objeto 'builtin' é fornecido diretamente no
     *      escopo principal quando a aplicação for embutida no App final.
     *      Se não informado um objeto vazio será considerado, porém o aplicativo
     *      não terá nenhuma funcionalidade.
     *
     *      [string] builtinName
     *      --------------------
     *      Por padrão '__builtin__' é considerado o objeto da aplicação embutido
     *      no App final, mas pode ser alterado conforme necessidade através dessa
     *      configuração.
     *
     *      [object] environment (opcional)
     *      --------------------
     *      Objeto com definições de ambiente, ou uma função que retorna esse 
     *      objeto.
     *   }
     */
    function setup() {
        // Selftest
        (function (args) {
            // Validando assinatura do método
            if (args.length !== 1)
                throw 'appi.setup argument signature is invalid';

            if (typeof args[0] != 'object')
                throw 'appi.setup @settings is invalid';

            if (typeof (args[0].scope) != 'object')
                throw 'appi.setup @settings.scope is invalid';
            settings_.scope = args[0].scope;

            settings_.appName = checkAppName(args[0].appName || 'App');

            trace(settings_.appName);

            if (typeof (args[0].appMock || {}) != 'object')
                throw 'appi.setup @settings.appMock is invalid';
            settings_.appMock = args[0].appMock || {};

            if (typeof (args[0].builtinName || '') != 'string')
                throw 'appi.setup @settings.builtinName is invalid';
            settings_.builtinName = args[0].builtinName || '__builtin__';

            var env_ = args[0].environment || {};

            env_ = typeof env_ == 'object' ? env_
                : typeof env_ == 'function' ? env_.apply(null, [])
                : null;

            if (typeof env_ != 'object')
                throw 'appi.setup @settings.environment invalid';
            settings_.environment = env_;

            // Descartando qualquer outro parâmetro de configuração
            // TODO:  Ver se os parâmetros extras podem ser incluídos como
            //        variáveis de ambiente em @settings.environment
            var validParamNames_ = [
                'scope',
                'appName',
                'appMock',
                'builtinName',
                'environment'
            ];

            for (var paramName_ in args[0])
                if (validParamNames_.indexOf(paramName_) < 0)
                    trace('Discarding setup @setting.' + paramName_);
        }).bind(this, arguments).apply()

        // Exportando as variáveis de ambiente fornecidas
        for (var envName_ in settings_.environment)
            environment_[envName_.toUpperCase()] = settings_.environment[envName_];

        // Exportando a instância da aplicação para o escopo informado
        var scopeRef_ = settings_.scope;
        scopeRef_[settings_.appName] = scopeRef_[settings_.builtinName] || settings_.appMock;
    };