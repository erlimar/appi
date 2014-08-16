    /**
     * appi.test.registerViewer
     *
     * Registra um engine de IViewer para visualização dos testes unitários.
     *
     * @param {IViewer} defViewer Definição do Viewer
     */
     function registerViewer(defViewer) {
        // Selftest
        (function (args) {
            if (args.length !== 1)
                throw 'appi.test.registerViewer argument signature is invalid';

            if (!$core.isObject(args[0]))
                throw 'appi.test.registerViewer @defViewer type is invalid';
        }).bind(this, arguments).apply();

        // IViewer.setup(testInfo, params)
        if($core.isDefined(defViewer.setup)){
            if(!$core.isFunction(defViewer.setup)){
                throw new Error('appi.test.registerViewer @defViewer.setup type is invalid');
            }
            $session.viewer.setup = defViewer.setup;
        }

        // IViewer.starting(timeBegin)
        if($core.isDefined(defViewer.starting)){
            if(!$core.isFunction(defViewer.starting)){
                throw new Error('appi.test.registerViewer @defViewer.starting type is invalid');
            }
            $session.viewer.starting = defViewer.starting;
        }

        // IViewer.startingComponent(component, timeBegin)
        if($core.isDefined(defViewer.startingComponent)){
            if(!$core.isFunction(defViewer.startingComponent)){
                throw new Error('appi.test.registerViewer @defViewer.startingComponent type is invalid');
            }
            $session.viewer.startingComponent = defViewer.startingComponent;
        }

        // IViewer.startingScenario(scenario, timeBegin)
        if($core.isDefined(defViewer.startingScenario)){
            if(!$core.isFunction(defViewer.startingScenario)){
                throw new Error('appi.test.registerViewer @defViewer.startingScenario type is invalid');
            }
            $session.viewer.startingScenario = defViewer.startingScenario;
        }

        // IViewer.startingPremisse(premisse, timeBegin)
        if($core.isDefined(defViewer.startingPremisse)){
            if(!$core.isFunction(defViewer.startingPremisse)){
                throw new Error('appi.test.registerViewer @defViewer.startingPremisse type is invalid');
            }
            $session.viewer.startingPremisse = defViewer.startingPremisse;
        }

        // IViewer.finishingPremisse(premisse, elapsed, passed, failure)
        if($core.isDefined(defViewer.finishingPremisse)){
            if(!$core.isFunction(defViewer.finishingPremisse)){
                throw new Error('appi.test.registerViewer @defViewer.finishingPremisse type is invalid');
            }
            $session.viewer.finishingPremisse = defViewer.finishingPremisse;
        }

        // IViewer.finishingScenario(scenario, elapsed, passed)
        if($core.isDefined(defViewer.finishingScenario)){
            if(!$core.isFunction(defViewer.finishingScenario)){
                throw new Error('appi.test.registerViewer @defViewer.finishingScenario type is invalid');
            }
            $session.viewer.finishingScenario = defViewer.finishingScenario;
        }

        // IViewer.finishingComponent(component, elapsed, passed)
        if($core.isDefined(defViewer.finishingComponent)){
            if(!$core.isFunction(defViewer.finishingComponent)){
                throw new Error('appi.test.registerViewer @defViewer.finishingComponent type is invalid');
            }
            $session.viewer.finishingComponent = defViewer.finishingComponent;
        }

        // IViewer.finishing(elapsed, passed)
        if($core.isDefined(defViewer.finishing)){
            if(!$core.isFunction(defViewer.finishing)){
                throw new Error('appi.test.registerViewer @defViewer.finishing type is invalid');
            }
            $session.viewer.finishing = defViewer.finishing;
        }
     }