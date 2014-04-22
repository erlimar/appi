    /**
     * appi.test.run
     *
     * Inicia a execução dos testes.
     */
    function run() {
        var extraParams_ = [];
        for(var arg in arguments){
            extraParams_.push(arguments[arg]);
        }

        var testInfo_ = $session.getTestInfo();
        $session.viewer.setup(testInfo_, extraParams_);

        var timeMachine_ = new TimeMachine;

        // -----------------------------------------------------------------------------------------
        // ALGORITHM BEGIN
        // -----------------------------------------------------------------------------------------
        var runPassed_ = null;
        $session.viewer.starting(timeMachine_.now());

        var componentIdx_ = 0;
        while($session.components.length > componentIdx_){
            var component_ = $session.components[componentIdx_];
            var componentPub_ = {
                id: componentIdx_,
                name: component_.name
            };

            var componentPassed_ = null;
            $session.viewer.startingComponent(componentPub_, timeMachine_.now());

            var scenarioIdx_ = 0;
            while(component_.scenarios.length > scenarioIdx_){
                var scenario_ = component_.scenarios[scenarioIdx_];
                var scenarioPub_ = {
                    id: scenarioIdx_,
                    name: scenario_.name,
                    description: scenario_.description
                };

                var scenarioPassed_ = null;
                $session.viewer.startingScenario(scenarioPub_, timeMachine_.now());

                var premisseIdx_ = 0;
                var environment_ = scenario_.setup();
                while(scenario_.premisses.length > premisseIdx_){
                    var premisse_ = scenario_.premisses[premisseIdx_];
                    var premissePub_ = {
                        id: premisseIdx_,
                        name: premisse_.name
                    };

                    var premissePassed_ = null;
                    var premisseFailure_ = null;
                    $session.viewer.startingPremisse(premissePub_, timeMachine_.now());

                    try{
                        // Calle callbac test
                        var this_ = {
                            expected: ExpectEvaluator
                        };
                        premisse_.callback.bind(this_, environment_).call();
                        premissePassed_ = true;
                    }catch(error){
                        premissePassed_ = false;
                        premisseFailure_ = error;
                    }

                    $session.viewer.finishingPremisse(premissePub_, timeMachine_.elapsed(),
                        premissePassed_, premisseFailure_);

                    scenarioPassed_ = !premissePassed_ ? false : scenarioPassed_;

                    premisseIdx_++;
                }

                scenarioPassed_ = scenarioPassed_ === null ? true : scenarioPassed_;

                $session.viewer.finishingScenario(scenarioPub_, timeMachine_.elapsed(),
                    scenarioPassed_);
                
                componentPassed_ = !scenarioPassed_ ? false : componentPassed_;

                scenarioIdx_++;
            }

            componentPassed_ = componentPassed_ === null ? true : false;

            $session.viewer.finishingComponent(componentPub_, timeMachine_.elapsed(),
                componentPassed_);

            runPassed_ = !componentPassed_ ? false : runPassed_;

            componentIdx_++;
        }

        runPassed_ = runPassed_ === null ? true : false;

        $session.viewer.finishing(timeMachine_.elapsed(), runPassed_);
        // -----------------------------------------------------------------------------------------
        // ALGORITHM END
        // -----------------------------------------------------------------------------------------
    };