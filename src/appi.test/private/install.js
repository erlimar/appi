    /**
     * install
     *
     * Instala o módulo no escopo ROOT.
     */
    function install() {
        if(!$root.appi)
            throw '@appi is required';
        
        // É na sessão que são guardados todos os dados do teste durante a configuração e execução
        $session = new Session();

        // Instancia um objeto de AppiTest como 'appi.test'
        $root.appi.test = new AppiTest();
        // Publica os objetos e funções na instância criada
        $core.extend($root.appi.test, {
            'unit': unit
        });
    }