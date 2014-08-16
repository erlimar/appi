    /**
     * install
     *
     * Instala o módulo no escopo ROOT.
     */
    function install() {
        if(!$root.appi)
            throw '@appi is required';
        
        // É na sessão que são guardados todos os dados do teste durante a configuração e execução
        $session = new Session();

        // Instancia um objeto de AppiTest como 'appi.test'
        $root.appi.test = new AppiTest();
        // Publica os objetos e funções na instância criada
        $core.extend($root.appi.test, {
            'unit': unit,
            'run': run,
            'registerViewer': registerViewer
        });

        // Register a default Not Implemented IViewer
        registerViewer({
            setup: function(){
                //throw new Error('IViewer.setup not Implemented!');
                console.log('IViewer.setup not Implemented!');
            },

            starting: function(time){
                //throw new Error('IViewer.starting not Implemented!');
                console.log(JSON.stringify(time), 'IViewer.starting ');
            },

            startingComponent: function(component, time){
                //throw new Error('IViewer.startingComponent not Implemented!');
                console.log(JSON.stringify(time), '    COMPONENT: ' + component.name);
            },

            startingScenario: function(scenario, time){
                //throw new Error('IViewer.startingScenario not Implemented!');
                console.log(JSON.stringify(time), '        SCENARIO: ' + scenario.name);
            },

            startingPremisse: function(premisse, time){
                //throw new Error('IViewer.startingPremisse not Implemented!');
                console.log(JSON.stringify(time), '            PREMISSE: ' + premisse.name);
            },

            finishingPremisse: function(premisse, elapsed, passed, failure){
                //throw new Error('IViewer.finishingPremisse not Implemented!');
                console.log('                                         ', elapsed, '  -> [' + (passed ? 'YES' : 'NO') + ']');
                if(!passed){
                    console.log('                                         *** ERROR *** [' + failure + ']');
                }
            },

            finishingScenario: function(scenario, elapsed, passed){
                //throw new Error('IViewer.finishingScenario not Implemented!');
                console.log('                                     ', elapsed, '  -> [' + (passed ? 'YES' : 'NO') + ']');
            },

            finishingComponent: function(component, elapsed, passed){
                //throw new Error('IViewer.finishingComponent not Implemented!');
                console.log('                                 ', elapsed, '  -> [' + (passed ? 'YES' : 'NO') + ']');
            },

            finishing: function(elapsed, passed){
                //throw new Error('IViewer.finishing not Implemented!');
                console.log('                             ', elapsed, '  -> [' + (passed ? 'YES' : 'NO') + ']');
            }
        });
    }