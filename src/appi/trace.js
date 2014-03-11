    /**
     * $logger
     *
     * Função padrão para descarte de mensagens de LOG caso não exista um objeto
     * válido para tratar este caso.
     */
    var $logger = function() {};

    // Se console.log está disponível, ele é usado como $logger
    if ($root.console  && $root.console.log && isFunction($root.console.log))
        $logger = $root.console.log;

    /**
     * appi.trace
     *
     * @description
     *
     * Um atalho para 'console.log' quando o mesmo estiver disponível
     */
    function trace() {
        for (var argIndex_ = 0; argIndex_ < arguments.length; argIndex_++)
            $logger('@appi.trace: ' + arguments[argIndex_]);
    };