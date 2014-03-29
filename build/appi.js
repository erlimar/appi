///
/// @module appi.main
/// Appi JavaScript Library (Main module)
///
/// Módulo principal da biblioteca Appi.
///
(function(root, undefined) {
    'use strict';

    var $root = root;

    if(!$root.AppiCore)
        throw '@AppiCore required';

    var $core = new $root.AppiCore();

    /**
     * Construtor
     */
    function Appi(){
    };

    Appi.prototype= {
        constructor: Appi,
        // Preserva qualquer declaração anterior de "appi". A mesma estará
        // disponível em "appi.appi".
        appi: $root.appi
    };

    // Configurações do setup
    var settings_ = {};

    // Variáveis de ambiente
    var environment_ = [];

    /**
     * Verifica se o nome da App está de acordo com os padrões
     * de nomeação de identificadores do JavaScript.
     */
    function checkAppName(appName) {
        if ($core.isUndefined(appName))
            throw 'appi.checkAppName @appName is invalid. Is undefined';

        if (!$core.isString(appName))
            throw 'appi.checkAppName @appName is invalid. Is not a string';

        // TODO: Melhorar para uso de única expressão regular ao invés
        //       desse gato (me envergonho de dizer isso).
        //
        //       Foi só pra não perder o racioncínio da ideia.
        var testAlpha_ = /^[a-zA-Z|_]$/;
        var testNum_ = /^[0-9]$/;

        for (var c in appName) {
            if (!(testAlpha_.test(appName[c]) || (testNum_.test(appName[c]) && c > 0)))
              throw 'appi.checkAppName "' + appName + '" is invalid @appName';
        }

        return appName;
    };

    /**
     * install
     *
     * Instala o módulo no escopo ROOT.
     */
    function install() {
        // Instancia um objeto de Appi como 'appi' no escopo ROOT
        $root.appi = new Appi();
        
        // Publicando core
        $core.extend($root.appi, $core);

        // Publicando Appi
        $core.extend($root.appi, {
            'env': environment_,
            'isolate': isolate,
            'module': module,
            'setup': setup,
            'timer': timer,
            'trace': trace
        });
    }

    /**
     * appi.isolate
     *
     * @description
     *
     * Faz com que a declaração e execução de métodos seja mais intuitiva
     * para os menos acostumados com JavaScript, ou, para os já acostumados,
     * faz o código ficar mais "clean".
     *
     * Ao invés de utilizar uma declaração como:
     * -----------------------------------------
     * <pre>
     *  (function(){
     *    // Seu código
     *  })()
     *
     *  // ou
     *
     *  +function(){
     *    // Seu código
     *  }()
     * </pre>
     *
     * você pode usar:
     * ---------------
     * <pre>
     *  api.isolate(function(){
     *    // Seu código
     *  })
     *
     *  // Se preferir pode usar várias funções em lote
     *  api.isolate(
     *    function(){
     *      // Seu código #1
     *    },
     *
     *    function(){
     *      // Seu código #2
     *    }
     *  )
     * </pre>
     */
    function isolate() {
        if (arguments.length < 1)
            return;

        // Toda função é separada para execução, e todo parâmetro NÃO FUNÇÃO,
        // é enfileirado para ser repassado a cada função como parâmetro.
        var methodStack_ = [];
        var paramStack_ = [];

        for (var argIndex = 0; argIndex < arguments.length; argIndex++) {
            if ($core.isFunction(arguments[argIndex]))
                methodStack_.push(arguments[argIndex]);
            else
                paramStack_.push(arguments[argIndex]);
        }

        if (methodStack_.length < 1)
            throw 'appi.isolate require a method to call';

        for (var index = 0; index < methodStack_.length; index++) {
            var function_ = methodStack_[index];
            // A própria função é passada como ponteiro "this" enquando
            // "appi.setup" ainda não for chamada, ou o escopo não tenha sido
            // informado.
            var this_ = $core.isUndefined(settings_.scope) ? function_ : settings_.scope;
            function_.apply(this_, paramStack_);
        }
    };

    /**
     * appi.module
     *
     * @description
     *
     * UNDONE: Ideia para criar um novo módulo
     */
    function module() {
        trace('Ideia appi.module');

        /*
         * A ideia é, que os módulos possam de alguma forma
         * ser integrados a applicação principal.
         *
         * Sendo ela um Mock ou um __bultin__.
         *
         * Na verdade um appi.module funcionará como um ponto
         * de extensão da App. De forma que o __builtin__ fica
         * sendo o "core back-end" da applicação, e os módulos
         * são extensões específicas do front-end.
         *
         * Pode ser utilizado da seguinte forma:
         *
         * var m1 = appi.import('modulename');
         *
         * m1.useModule( m1.var );
         */

        /*
          appi.module('moduleName', function () {

            return {
              variable: 'My variable',

              func: function () {
                return 'My function';
              }
            };
          });
        */
    };

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
            if (args.length !== 1)
                throw 'appi.setup argument signature is invalid';

            if (typeof args[0] != 'object')
                throw 'appi.setup @settings is invalid';

            if (typeof (args[0].scope) != 'object')
                throw 'appi.setup @settings.scope is invalid';
            settings_.scope = args[0].scope;

            settings_.appName = checkAppName(args[0].appName || 'App');

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

        // Exportando as variáveis de ambiente
        for (var envName_ in settings_.environment)
            environment_[envName_.toUpperCase()] = settings_.environment[envName_];

        // Exportando a instância da aplicação para o escopo root
        var scopeRef_ = settings_.scope;
        scopeRef_[settings_.appName] = scopeRef_[settings_.builtinName] || settings_.appMock;
    };

    /**
     * appi.timer
     *
     * Executa um callback após se esgotar o tempo definido em @timeOut
     *
     * @param timeOut   Tempo em milisegundos para aguardar antes de executar o
     *                  @callback
     *
     * @param callback  Função callback para executar
     *
     * @param counter   Informa quantas vezes o callback deve ser executado até
     *                  o processo ser descartado. Se nenhum valor for informado,
     *                  ou se um valor menor ou igual a 0 (zero) for informado,
     *                  -1 será  considerado.
     *                  Caso o valor considerado seja -1, o callback será executado
     *                  ininterruptamente, ou até ser cancelado explicitamente.
     *
     * @param data      Dados extra que serão repassados ao callback
     *
     * @return          O Handle do timer criado, para que possa ser cancelado
     *                  explicitamente.
     */
    function timer(timeOut, callback, counter, data) {
        if (typeof timeOut != 'number')
            throw 'appi.timer @timeOut param is invalid';

        if (typeof callback != 'function')
            throw 'appi.timer @callback param is invalid';

        if (typeof counter !== typeof 0 && typeof counter !== typeof undefined)
            throw 'appi.timer @counter param is invalid';
        
        // Por questões de segurança (performance), um valor mínimo para timeOut
        // é estabelecido aqui.
        var minTimeOut = 100;

        if (timeOut < minTimeOut) {
            timeOut = minTimeOut;
            trace('appi.timer @timeOut param is very small, ' + timeOut + ' is assumed')
        }

        var data_ = typeof data !== typeof undefined ? data : null;

        var counter_ = typeof counter === typeof undefined ? -1
            : counter > 0 ? counter : -1;

        // Criando o Handle
        var handle_ = setInterval(function (timerArgs) {
            callback(timerArgs.data);

            if(timerArgs.counter > 0)
                timerArgs.counter--;

            // Descartando o timer se for o momento
            if (timerArgs.counter === 0)
              clearTimeout(handle_);
        }.bind(this, { counter: counter_, data: data_ }), timeOut);

        return handle_;
    };

    /**
     * $logger
     *
     * Função padrão para descarte de mensagens de LOG caso não exista um objeto
     * válido para tratar este caso.
     */
    var $logger = function() {
        /* DISCARDING ALL */
    };

    /**
     * appi.trace
     *
     * @description
     *
     * Um atalho para 'console.log' quando o mesmo estiver disponível
     */
    var trace = $logger.bind(this);

    // Se console.log está disponível, ele é usado no lugar de $logger
    if ($root.console  && $root.console.log && $core.isFunction($root.console.log))
        trace = $root.console.log.bind(console);

    install();

})(window);
