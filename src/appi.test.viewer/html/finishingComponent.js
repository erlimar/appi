    /**
     * finishingComponent
     *
     * Implementa IViewer.finishingComponent
     *
     * <code>
     Component {
        id: 'int',
        name: 'string'
     }
     * </code>
     *
     * @param {Component}   component   Dados do componente sendo testado
     * @param {int}         elapsed     Tempo (em milisegundo) que o teste do componente
     *                                  demorou para ser executado
     * @param {bool}        passed      Se o teste do componente passou ou não
     */
    function finishingComponent(component, elapsed, passed){
        console.log('finishingComponent: ' + component.name + ' [' + (passed ? 'OK' : 'FAILURE') + ']');
    }