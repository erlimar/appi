    /**
     * install
     *
     * Instala o módulo no escopo ROOT.
     */
    function install() {
        if(isUndefined($root.appi))
            throw '@appi is required';
        
        // Instancia um objeto de AppiTest como 'appi.test' no escopo ROOT
        $root.appi.test = new AppiTest();
        // Publica os objetos e funções na instância criada
        extend($root.appi.test, {
        });
    }