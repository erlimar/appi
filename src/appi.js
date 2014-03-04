/**
 * Appi JavaScript Library v0.0.1
 *
 * Appi vem de "Application Interface" (Aqui, interface tem o ponto de vista
 * daquilo que o usuário vê - ou seja, o desenvolvimento do "front-end" por
 * exemplo)
 *
 * É uma biblioteca que auxilia na definição da interface para aplicações Web e
 * mobile. Voltada principalmente para o estágio de desenvolvimento, permitindo
 * que após os testes de desenvolvimento da interface, a mesma possa ser
 * acoplada, a um "back-end" por exemplo, e passar a funcionar imediatamente.
 *
 * Appi é útil principalmente nos processos de desenvolvimento onde o "front-end"
 * é desenvolvido antes do "back-end", ou quando os mesmos são desenvolvidos
 * paralelamente mas por equipes distintas. Esse processo de desenvolvimento
 * prevê que o "front-end" e o "back-end" são componentes distintos do mesmo
 * produto, que devem existir coesos de forma isolada, mas que funcionam
 * acoplados para provê um sistema qualquer. E para isso respondem a um contrato,
 * que por sua vez é uma INTERFACE implementada pelo "back-end" e consumida pelo
 * "front-end".
 *
 * Copyright (c) 2014 Erlimar Silva Campos http://erlimar.com
 * Copyright (c) 2014 Eh Sistemas de Informática http://www.ehsistemas.com.br
 */
+function (scope, undefined) {
  'use strict';

  var settings_ = {};

  var __appi__ =
  {
    /**
     * appi.env
     *
     * @description
     *
     * Exportação das variáveis de ambiente
     */
    env: [],

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
    setup: function () {

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

        settings_.appName = $private.checkAppName(args[0].appName || 'App');

        this.trace(settings_.appName);

        if (typeof (args[0].appMock || {}) != 'object')
          throw 'appi.setup @settings.appMock is invalid';
        settings_.appMock = args[0].appMock || {};

        if (typeof (args[0].builtinName || '') != 'string')
          throw 'appi.setup @settings.builtinName is invalid';
        settings_.builtinName = args[0].builtinName || '__builtin__';

        var environment_ = args[0].environment || {};

        environment_ = typeof environment_ == 'object' ? environment_
          : typeof environment_ == 'function' ? environment_.apply(null, [])
          : null;

        if (typeof environment_ != 'object')
          throw 'appi.setup @settings.environment invalid';
        settings_.environment = environment_;

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

        for (var paramName_ in args[0]) {
          if (validParamNames_.indexOf(paramName_) < 0) {
            this.trace('Discarding setup @setting.' + paramName_);
          }
        }
      }).bind(this, arguments).apply()

      // Exportando as variáveis de ambiente fornecidas
      for (var envName_ in settings_.environment)
        this.env[envName_.toUpperCase()] = settings_.environment[envName_];

      // Exportando a instância da aplicação para o escopo informado
      var scopeRef_ = settings_.scope;
      scopeRef_[settings_.appName] = scopeRef_[settings_.builtinName] || settings_.appMock;
    },

    /**
     * appi.trace
     *
     * @description
     *
     * Um atalho para 'console.log' quando o mesmo estiver disponível
     */
    trace: function () {

      if (!console || !console.log)
        return;
      for (var argIndex_ = 0; argIndex_ < arguments.length; argIndex_++)
        console.log('@appi.trace: ' + arguments[argIndex_]);
    },

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
     *  api.lambda(function(){
     *    // Seu código
     *  })
     *
     *  // Se preferir pode usar várias funções em lote
     *  api.lambda(
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
    isolate: function () {

      if (arguments.length < 1)
        return;

      // Recolhendo as funções para executar e separando-as dos parâmetros
      // que serão passados a cada função.
      //
      // NOTE:  Toda função é separada para execução, e todo parâmetro
      //        NÃO FUNÇÃO, é enfileirado para ser repassado a cada
      //        função como parâmetros.
      var methodStack_ = [];
      var paramStack_ = [];

      for (var argIndex = 0; argIndex < arguments.length; argIndex++) {

        if (this.isFunction(arguments[argIndex]))
          methodStack_.push(arguments[argIndex]);
        else
          paramStack_.push(arguments[argIndex]);
      }

      // Ao menos um método é requerido
      if (methodStack_.length < 1)
        throw 'appi.lambda require a method to call';

      // Executando os métodos em lote
      for (var methodIndex = 0; methodIndex < methodStack_.length; methodIndex++) {

        var function_ = methodStack_[methodIndex];

        // A própria função é passada como ponteiro "this" quando "appi.setup" ainda
        // não tiver sido chamada, ou o escopo não tenha sido informado.
        var this_ = this.isUndefined(settings_.scope) ? function_ : settings_.scope;
        function_.apply(this_, paramStack_);
      }
    },

    /**
     * appi.module
     *
     * @description
     *
     * UNDONE: Ideia para cria um novo módulo
     */
    module: function () {

      this.trace('Ideia appi.module');

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
    },

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
    timer: function (timeOut, callback, counter, data) {

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
        this.trace('appi.timer @timeOut param is very small, ' + timeOut + ' is assumed')
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
    },

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
    isUndefined: function (varObject) {

      return (typeof varObject === typeof undefined);
    },

    /**
     * appi.isString
     *
     * @description
     *
     * Verifica se um objeto/variável é uma string.
     *
     * @param varObject Qualquer identificador de variável
     */
    isString: function (varObject) {

      return (typeof varObject === typeof '');
    },

    /**
     * appi.isNumber
     *
     * @description
     *
     * Verifica se um objeto/variável é um número.
     *
     * @param varObject Qualquer identificador de variável
     */
    isNumber: function (varObject) {

      return (typeof varObject === typeof 0 || varObject instanceof Number);
    },

    /**
     * appi.isFunction
     *
     * @description
     *
     * Verifica se um objeto/variável é uma função.
     *
     * @param varObject Qualquer identificador de variável
     */
    isFunction: function (varObject) {
      return (typeof varObject === typeof function () { });
    },

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
    describeFunction: function(funcObject) {

      if(!this.isFunction(funcObject))
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
    }
  };

  // Dados privados de __appi__
  var __private__ = {
    
    /**
     * Verifica se o nome da App está de acordo com os padrões
     * de nomeação de identificadores do JavaScript.
     */
    checkAppName: function (appName) {

      if ($public.isUndefined(appName))
        throw 'appi.checkAppName @appName is invalid. Is undefined';

      if (!$public.isString(appName))
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
    }
  };

  // Atalhos para dados privados e públicos de __appi__
  var $public = __appi__;
  var $private = __private__;

  // Interface publica de appi
  scope['appi'] = __appi__;

}(window)