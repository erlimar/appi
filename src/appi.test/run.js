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

        var timeMachine_ = new TimeMachine_;

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
                        premisse_.callback();
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

    /**
     * Máquina do tempo. Para calcular intervalos de tempos usando uma pilha comum.
     *
     * this.now     => Cria uma marca de tempo, adicionando o momento atual no topo da pilha.
     * this.elapsed => Calcula o tempo decorrido entre a marca no topo da pilha e o momento atual,
     *                 após, remove a marca do topo da pilha.
     */
    function TimeMachine_() {
        var stack_ = [];

        this.now = function(){
            var now_ = new Date;
            stack_.push(now_);
            return now_;
        };

        this.elapsed = function(){
            if(stack_.length < 1)
                throw new Error('appi.test.run internal error #1 [pop@timeStack]');
            var last_ = stack_.pop();
            return (new Date) - last_;
        };
    };