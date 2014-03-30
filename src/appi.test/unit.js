    /**
     * appi.test.unit
     *
     * Define um cenário para teste unitário.
     */
    function unit(defTest) {
        // Selftest
        (function (args) {
            if (args.length !== 1)
                throw 'appi.test.unit argument signature is invalid';

            if (!$core.isObject(args[0]))
                throw 'appi.test.unit @defTest type is invalid';

            if(!$core.isString(args[0].component))
                throw 'appi.test.unit @defTest.component required or invalid type';

            if(!$core.isUndefined(args[0].setup) && !$core.isFunction(args[0].setup))
                throw 'appi.test.unit @defTest.setup type invalid';

            if(!$core.isObject(args[0].scenario))
                throw 'appi.test.unit @defTest.scenario required or invalid type';

            if(!$core.isString(args[0].scenario.name))
                throw 'appi.test.unit @defTest.scenario.name required or invalid type';

            if(!$core.isString(args[0].scenario.description)
            && !$core.isArray(args[0].scenario.description))
                throw 'appi.test.unit @defTest.scenario.description required or invalid type';

            if(!$core.isObject(args[0].scenario.premisses))
                throw 'appi.test.unit @defTest.scenario.premisses required or invalid type';

            for(var premisse_ in args[0].scenario.premisses){
                if(!$core.isString(premisse_))
                    throw 'appi.test.unit @premisses invalid type';

                if(!$core.isFunction(args[0].scenario.premisses[premisse_]))
                    throw 'appi.test.unit @premisses invalid type';
            }
        }).bind(this, arguments).apply();

        var component_ = $session.addComponent(defTest.component);
        var scenario_ = component_.addScenario(defTest.scenario.name);

        if($core.isArray(defTest.scenario.description))
            scenario_.description = defTest.scenario.description.join('\n');
        else
            scenario_.description = defTest.scenario.description;

        if($core.isDefined(defTest.setup))
            scenario_.setup = defTest.setup;

        for(var premisse_ in defTest.scenario.premisses){
            var callback_ = defTest.scenario.premisses[premisse_];
            scenario_.addPremisse(premisse_, callback_);
        }
    }