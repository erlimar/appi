    /**
     * startingScenario
     *
     * Implementa IViewer.startingScenario
     *
     * <code>
     Scenario {
        id: 'int',
        name: 'string',
        description: 'string'
     }
     * </code>
     *
     * @param {Scenario}   scenario    Dados do cenário sendo testado
     * @param {Date}       timeBegin   Data/Hora de início dos testes com o cenário
     */
    function startingScenario(scenario, timeBegin){
        console.log('startingScenario: ' + scenario.name);
    }