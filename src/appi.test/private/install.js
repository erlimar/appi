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
                throw new Error('IViewer.setup not Implemented!');
            },

            starting: function(time){
                throw new Error('IViewer.starting not Implemented!');
            },

            startingComponent: function(component, time){
                throw new Error('IViewer.startingComponent not Implemented!');
            },

            startingScenario: function(scenario, time){
                throw new Error('IViewer.startingScenario not Implemented!')
            },

            startingPremisse: function(premisse, time){
                throw new Error('IViewer.startingPremisse not Implemented!');
            },

            finishingPremisse: function(premisse, elapsed, passed, failure){
                throw new Error('IViewer.finishingPremisse not Implemented!');
            },

            finishingScenario: function(scenario, elapsed, passed){
                throw new Error('IViewer.finishingScenario not Implemented!');
            },

            finishingComponent: function(component, elapsed, passed){
                throw new Error('IViewer.finishingComponent not Implemented!');
            },

            finishing: function(elapsed, passed){
                throw new Error('IViewer.finishing not Implemented!');
            }
        });
    }