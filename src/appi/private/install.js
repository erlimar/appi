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