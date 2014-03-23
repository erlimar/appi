    /**
     * Session
     *
     * Objeto de sessão
     */
    function Session(){
        extend(this, appi.readyArguments(arguments, {
            'components': appi.ARGS.array()
        }));
    };

    Session.prototype = {
        constructor: Session,

        components: []
    };