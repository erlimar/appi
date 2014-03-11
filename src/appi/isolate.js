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

        // Recolhendo as funções para executar e separando-as dos parâmetros
        // que serão passados a cada função.
        //
        // NOTE:  Toda função é separada para execução, e todo parâmetro
        //        NÃO FUNÇÃO, é enfileirado para ser repassado a cada
        //        função como parâmetros.
        var methodStack_ = [];
        var paramStack_ = [];

        for (var argIndex = 0; argIndex < arguments.length; argIndex++) {
            if (isFunction(arguments[argIndex]))
                methodStack_.push(arguments[argIndex]);
            else
                paramStack_.push(arguments[argIndex]);
        }

        // Ao menos um método é requerido
        if (methodStack_.length < 1)
            throw 'appi.isolate require a method to call';

        // Executando os métodos em lote
        for (var methodIndex = 0; methodIndex < methodStack_.length; methodIndex++) {
            var function_ = methodStack_[methodIndex];
            // A própria função é passada como ponteiro "this" quando "appi.setup" ainda
            // não tiver sido chamada, ou o escopo não tenha sido informado.
            var this_ = isUndefined(settings_.scope) ? function_ : settings_.scope;
            function_.apply(this_, paramStack_);
        }
    };