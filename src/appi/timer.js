    /**
     * appi.timer
     *
     * Executa um callback após se esgotar o tempo definido em @timeOut
     *
     * @param timeOut   Tempo em milisegundos para aguardar antes de executar o
     *                  @callback
     *
     * @param callback  Função callback para executar
     *
     * @param counter   Informa quantas vezes o callback deve ser executado até
     *                  o processo ser descartado. Se nenhum valor for informado,
     *                  ou se um valor menor ou igual a 0 (zero) for informado,
     *                  -1 será  considerado.
     *                  Caso o valor considerado seja -1, o callback será executado
     *                  ininterruptamente, ou até ser cancelado explicitamente.
     *
     * @param data      Dados extra que serão repassados ao callback
     *
     * @return          O Handle do timer criado, para que possa ser cancelado
     *                  explicitamente.
     */
    function timer(timeOut, callback, counter, data) {
        if (typeof timeOut != 'number')
            throw 'appi.timer @timeOut param is invalid';

        if (typeof callback != 'function')
            throw 'appi.timer @callback param is invalid';

        if (typeof counter !== typeof 0 && typeof counter !== typeof undefined)
            throw 'appi.timer @counter param is invalid';

        // Por questões de segurança (performance), um valor mínimo para timeOut
        // é estabelecido aqui.
        var minTimeOut = 100;

        if (timeOut < minTimeOut) {
            timeOut = minTimeOut;
            trace('appi.timer @timeOut param is very small, ' + timeOut + ' is assumed')
        }

        var data_ = typeof data !== typeof undefined ? data : null;

        var counter_ = typeof counter === typeof undefined ? -1
            : counter > 0 ? counter : -1;

        // Criando o Handle
        var handle_ = setInterval(function (timerArgs) {
            callback(timerArgs.data);

            if(timerArgs.counter > 0)
                timerArgs.counter--;

            // Descartando o timer se for o momento
            if (timerArgs.counter === 0)
              clearTimeout(handle_);
        }.bind(this, { counter: counter_, data: data_ }), timeOut);

        return handle_;
    };