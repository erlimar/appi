    /**
     * Premisse
     *
     * Objeto de premissa
     */
    function Premisse(){
        $core.extend(this, $core.readyArguments(arguments, {
            'name':     $core.ARGS.string(),
            'callback': $core.ARGS.function()
        }));
    };

    Premisse.prototype = {
        constructor: Premisse
    };