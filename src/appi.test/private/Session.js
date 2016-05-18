    /**
     * Session
     *
     * Objeto de sessão
     */
    function Session(){
        $core.extend(this, $core.readyArguments(arguments, {
            'components': $core.ARGS.array([]),
            'viewer': $core.ARGS.object({})
        }));
    }

    Session.prototype = {
        constructor: Session,

        /**
         * Adiciona um novo componente na lista caso ainda não exista, e o retorna. Se o componente
         * já existir na lista, esse é retornado.
         */
        addComponent: function(componentName) {
            var componentAdded_ = null;
            for(var index_ = 0; index_ < this.components.length; index_++){
                var component_ = this.components[index_];
                if(component_.name === componentName){
                    componentAdded_ = component_;
                    break;
                }
            }

            if(componentAdded_ !== null)
                return componentAdded_;

            componentAdded_ = new Component(componentName);
            this.components.push(componentAdded_);
            return componentAdded_;
        },

        /**
         * Retorna as informações públicas dos objetos de teste na sessão.
         *
         * No final, é um Array de Components, e Scenarios dos componentes.
         *
         * [
         *   {
         *     id: 0,
         *     name: 'Component',
         *     scenarios: [
         *       {
         *         id: 0,
         *         name: 'Name',
         *         description: 'Description',
         *         premisses: [
         *           {
         *             id: 0,
         *             name: 'Name'
         *           },
         *           ...
         *         ]
         *       },
         *       ...
         *     ]
         *   },
         *   ...
         * ]
         */
        getTestInfo: function() {
            var publicDescription_ = [];

            // Components
            var componentIndex_ = 0;
            while(this.components.length > componentIndex_){
                var component_ = this.components[componentIndex_];
                var publicComponent_ = {
                    id: componentIndex_,
                    name: component_.name,
                    scenarios: []
                };
                publicDescription_.push(publicComponent_);

                // Scenarios of Components
                var scenarioIndex_ = 0;
                while(component_.scenarios.length > scenarioIndex_){
                    var scenario_ = component_.scenarios[scenarioIndex_];
                    var publicScenario_ = {
                        id: scenarioIndex_,
                        name: scenario_.name,
                        description: scenario_.description,
                        premisses: []
                    };
                    publicComponent_.scenarios.push(publicScenario_);

                    // Premisses of Scenarios
                    var premisseIndex_ = 0;
                    while(scenario_.premisses.length > premisseIndex_){
                        var premisse_ = scenario_.premisses[premisseIndex_];
                        var publicPremisse_ = {
                            id: premisseIndex_,
                            name: premisse_.name
                        }
                        publicScenario_.premisses.push(publicPremisse_);
                        premisseIndex_++;
                    }
                    scenarioIndex_++;
                }
                componentIndex_++;
            }
            
            return publicDescription_;
        }
    }