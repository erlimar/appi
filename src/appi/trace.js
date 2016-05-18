    /**
     * $logger
     *
     * Função padrão para descarte de mensagens de LOG caso não exista um objeto
     * válido para tratar este caso.
     */
    var $logger = function() {
        /* DISCARDING ALL */
    }

    /**
     * appi.trace
     *
     * @description
     *
     * Um atalho para 'console.log' quando o mesmo estiver disponível
     */
    var trace = $logger.bind(this);

    // Se console.log está disponível, ele é usado no lugar de $logger
    if ($root.console  && $root.console.log && $core.isFunction($root.console.log)) {
        trace = $root.console.log.bind(console);
    }
