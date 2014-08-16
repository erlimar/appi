# Algoritmo para _`appi.test.run`_

Pseudocódigo com ideia inicial da solução para o procedimento `run` que irá administrar a execução dos testes.

```
begin run
    set runTimeBegin <= {CURRENT TIME}
    set runPassed <= {NONE}
    call viewer.starting <= runTimeBegin
    begin loop for Component <= Components
        set componentTimeBegin <= {CURRENT TIME}
        set componentPassed <= {NONE}
        call viewer.startingComponent <= Component, componentTimeBegin
        begin loop for Scenario <= Component.Scenarios
            set scenarioTimeBegin <= {CURRENT TIME}
            set scenarioPassed <= {NONE}
            call viewer.startingScenario <= Scenario, scenarioTimeBegin
            begin loop for Premisse <= Scenario.Premisses
                set premisseTimeBegin <= {CURRENT TIME}
                set premissePassed <= {NONE}
                set premisseFailure <= {NONE}
                call viewer.startingPremisse <= Premisse, premisseTimeBegin
                begin try
                    call Premisse <= {SESSION ENVIRONMENT}
                    set premissePassed <= {TRUE}
                begin catch Error
                    set premissePassed <= {FALSE}
                    set premisseFailure <= Error
                end try
                set premisseTimeElapsed
                    <= {CURRENT TIME - premisseTimeBegin}
                call viewer.finishingPremisse
                    <= Premisse, premisseTimeElapsed, premissePassed, premisseFailure
                if not premissePassed then set scenarioPassed <= {FALSE}
            end loop
            set scenarioTimeElapsed <= {CURRENT TIME - scenarioTimeBegin}
            if scenarioPassed is {NONE} then set scenarioPassed <= {TRUE}
            call viewer.finishingScenario
                <= Scenario, scenarioTimeElapsed, scenarioPassed
            if not scenarioPassed then set componentPassed <= {FALSE}
        end loop
        set componentTimeElapsed <= {CURRENT TIME - componentTimeBegin}
        if componentPassed is {NONE} then set componentPassed <= {TRUE}
        call viewer.finishingComponent
            <= Component, componentTimeElapsed, componentPassed
        if not componentPassed then set runPassed <= {FALSE}
    end loop
    set runTimeElapsed <= {CURRENT TIME - runTimeBegin}
    if runPassed is {NONE} then set runPassed <= {TRUE}
    call viewer.finishing <= runTimeElapsed, runPassed
end run
```

# Estrutura do `viewer`

Com esse algoritmo, um `viewer` precisa atender a seguinte interface, de forma responder corretamente aos *Eventos* do método `run`:

```js
interface IViewer {
    /**
     * Executado no inicio para informar o cenário geral do teste
     *
     * @param {Object} testInfo Informações do teste
     * @param {Array} params Parâmetros extras passados no momento em que o teste foi iniciado
     */
    function setup(testInfo, params),

    /**
     * Executado quando os testes iniciam
     *
     * @param {Date} timeBegin Data/hora de início do teste
     */
    function starting(timeBegin),

    /**
     * Executado quando o teste de um componente inicia
     *
     * @param {Object} component Componente sendo testado
     * @param {Date} timeBegin Data/hora de início do teste
     */
    function startingComponent(component, timeBegin),

    /**
     * Executado quanto o teste de um cenário inicia
     *
     * @param {Object} scenario Cenário sendo testado
     * @param {Date} timeBegin Data/hora de início do teste
     */
    function startingScenario(scenario, timeBegin),

    /**
     * Executado quando o teste de uma premissa inicia
     *
     * @param {Object} premisse Premissa sendo testada
     * @param {Date} timeBegin Data/hora de início do teste
     */
    function startingPremisse(premisse, timeBegin),

    /**
     * Executado quando o teste de uma premissa finaliza
     *
     * @param {Object} premisse Premissa sendo testada
     * @param {int} elapsed Tempo (em milesegundos) gasto na execução do teste
     * @param {bool} passed Se o teste passou ou não
     * @param {Object} failure Objeto de exceção quando o teste falha, NULL se o teste passou
     */
    function finishingPremisse(premisse, elapsed, passed, failure),

    /**
     * Executado quando o teste de um cenário finaliza
     *
     * @param {Object} scenario Cenário sendo testado
     * @param {int} elapsed Tempo (em milesegundos) gasto na execução do teste
     * @param {bool} passed Se o teste passou ou não
     */
    function finishingScenario(scenario, elapsed, passed),

    /**
     * Executado quando o teste de um componente finaliza
     *
     * @param {Object} component Componente sendo testado
     * @param {int} elapsed Tempo (em milesegundos) gasto na execução do teste
     * @param {bool} passed Se o teste passou ou não
     */
    function finishingComponent(component, elapsed, passed),

    /**
     * Executado quando os testes finalizam
     *
     * @param {int} elapsed Tempo (em milesegundos) gasto na execução do teste
     * @param {bool} passed Se o teste passou ou não
     */
    function finishing(elapsed, passed)
}
```