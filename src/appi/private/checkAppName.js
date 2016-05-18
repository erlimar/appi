    /**
     * Verifica se o nome da App está de acordo com os padrões
     * de nomeação de identificadores do JavaScript.
     */
    function checkAppName(appName) {
        if ($core.isUndefined(appName))
            throw 'appi.checkAppName @appName is invalid. Is undefined';

        if (!$core.isString(appName))
            throw 'appi.checkAppName @appName is invalid. Is not a string';

        // TODO: Melhorar para uso de única expressão regular ao invés
        //       desse gato (me envergonho de dizer isso).
        //
        //       Foi só pra não perder o racioncínio da ideia.
        var testAlpha_ = /^[a-zA-Z|_]$/;
        var testNum_ = /^[0-9]$/;

        for (var c in appName) {
            if (!(testAlpha_.test(appName[c]) || (testNum_.test(appName[c]) && c > 0)))
              throw 'appi.checkAppName "' + appName + '" is invalid @appName';
        }

        return appName;
    }