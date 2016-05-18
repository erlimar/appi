    /**
     * finishing
     *
     * Implementa IViewer.finishing
     *
     * @param {int}     elapsed     Tempo (em milisegundo) que o teste demorou para ser executado
     * @param {bool}    passed      Se o teste passou ou não
     */
    function finishing(elapsed, passed){
        console.log('finishing [' + (passed ? 'OK' : 'FAILURE') + ']');
    }