    /**
     * finishingPremisse
     *
     * Implementa IViewer.finishingPremisse
     *
     * <code>
     Premisse {
        id: 'int',
        name: 'string'
     }
     * </code>
     *
     * @param {Premisse}   premisse   Dados da premissa sendo testada
     * @param {int}        elapsed    Tempo (em milisegundo) que o teste da premissa
     *                                demorou para ser executado
     * @param {bool}       passed     Se o teste da premissa passou ou não
     * @param {Error}      failure    Objeto que descreve o erro quando o teste não
     *                                passar, ou <null> quando passar.
     */
    function finishingPremisse(premisse, elapsed, passed, failure){
        console.log('finishingPremisse ' + premisse.name + ' [' + (passed ? 'OK' : 'FAILURE *** ' + failure) + ']');
    }