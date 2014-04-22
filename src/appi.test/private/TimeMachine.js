    /**
     * Máquina do tempo. Para calcular intervalos de tempos usando uma pilha comum.
     *
     * this.now     => Cria uma marca de tempo, adicionando o momento atual no topo da pilha.
     * this.elapsed => Calcula o tempo decorrido entre a marca no topo da pilha e o momento atual,
     *                 após, remove a marca do topo da pilha.
     */
    function TimeMachine() {
        var stack_ = [];

        this.now = function(){
            var now_ = new Date;
            stack_.push(now_);
            return now_;
        };

        this.elapsed = function(){
            if(stack_.length < 1)
                throw new Error('appi.test.run internal error #1 [pop@timeStack]');
            var last_ = stack_.pop();
            return (new Date) - last_;
        };
    };