    /**
     * Component
     *
     * Objeto de component
     */
    function Component(){
        extend(this, appi.readyArguments(arguments, {
            'name':     appi.ARGS.string(),
            'callback': appi.ARGS.array()
        }));
    };

    Component.prototype = {
        constructor: Component,

        name: null,
        cenarios: []
    };