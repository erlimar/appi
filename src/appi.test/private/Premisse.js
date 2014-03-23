    /**
     * Premisse
     *
     * Objeto de premissa
     */
    function Premisse(){
        extend(this, appi.readyArguments(arguments, {
            'name':     appi.ARGS.string(),
            'callback': appi.ARGS.function()
        }));
    };

    Premisse.prototype = {
        constructor: Premisse,

        name: null,
        callback: null
    };