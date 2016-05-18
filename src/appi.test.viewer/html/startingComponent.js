    /**
     * startingComponent
     *
     * Implementa IViewer.startingComponent
     *
     * <code>
     Component {
        id: 'int',
        name: 'string'
     }
     * </code>
     *
     * @param {Component}   component   Dados do componente sendo testado
     * @param {Date}        timeBegin   Data/Hora de início dos testes com o componente
     */
    function startingComponent(component, timeBegin){
        console.log('startingComponent: ' + component.name);
    }