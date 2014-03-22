    /**
     * install
     *
     * Instala o módulo no escopo ROOT.
     */
    function install() {
        // Instancia um objeto de Appi como 'appi' no escopo ROOT
        $root.appi = new Appi();
        // Publica os objetos e funções na instância criada
        extend($root.appi, {
            'env': environment_,
            
            'isolate': isolate,
            'module': module,
            'setup': setup,
            'timer': timer,
            'trace': trace,
            'describeFunction': describeFunction,
            'isFunction': isFunction,
            'isNumber': isNumber,
            'isString': isString,
            'isUndefined': isUndefined
        });
    }