    /**
     * finishingScenario
     *
     * Implementa IViewer.finishingScenario
     *
     * <code>
     Scenario {
        id: 'int',
        name: 'string',
        description: 'string'
     }
     * </code>
     *
     * @param {Scenario}   scenario   Dados do cenário sendo testado
     * @param {int}        elapsed    Tempo (em milisegundo) que o teste do cenário
     *                                demorou para ser executado
     * @param {bool}       passed     Se o teste do cenário passou ou não
     */
    function finishingScenario(scenario, elapsed, passed){
        console.log('finishingScenario: ' + scenario.name + '[' + (passed ? 'OK' : 'FAILURE') + ']');
    }