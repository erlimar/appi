    /**
     * Session
     *
     * Objeto de sessão
     */
    function Session(){
        $core.extend(this, $core.readyArguments(arguments, {
            'components': $core.ARGS.array([])
        }));
    };

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
        }
    };