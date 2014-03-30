    /**
     * Component
     *
     * Objeto de component
     */
    function Component(){
        $core.extend(this, $core.readyArguments(arguments, {
            'name':      $core.ARGS.string(),
            'scenarios': $core.ARGS.array([])
        }));
    };

    /**
     * Verifica se um cenário já existe na lista de um determinado componente
     */
    var ScenarioExistsInComponent = function(component, scenarioName) {
        for(var index_ = 0; index_ < component.scenarios.length; index_++){
            var scenario_ = component.scenarios[index_];
            if(scenario_.name.toLowerCase() === scenarioName.toLowerCase())
                return true;
        }

        return false;
    };

    Component.prototype = {
        constructor: Component,

        /**
         * Adiciona um novo cenário na lista e o retorna.
         */
        addScenario: function(scenarioName) {
            if(ScenarioExistsInComponent(this, scenarioName))
                throw 'Scenario "' + scenarioName + '" already exists!';

            var scenarioAdded_ = new Scenario(scenarioName);
            this.scenarios.push(scenarioAdded_);
            return scenarioAdded_;
        }
    };