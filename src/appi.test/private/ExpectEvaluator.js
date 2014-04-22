    /**
     * ExpectEvaluator
     *
     * Avaliador de expectativa.
     *
     * Na prática uma premissa do teste consiste na verificação de uma ou mais
     * espectativas. A premissa do próprio teste unitário é que já se sabe o que
     * se espera, e se outro dado é recebido o teste falha.
     *
     * Este objeto se encarrega de avaliar essas espectativas.
     *
     * TODO: Verificar nomenclatura com relação ao inglês
     */
    function ExpectEvaluator(expected) {
        // Selftest
        if (arguments.length !== 1)
            throw 'appi.test#ExpectEvaluator argument signature is invalid';

        var expectedValue = expected;
        
        /* Lista de avaliadores disponíveis. Esses podrão ser usados na execução
         * das premissas, no objeto `this.expect`:
         * 
         * <code>
         appi.test.unit({
            ...
            premisses: [
                'Premissa A'
                : function() {
                    this.expect(value).evaluatorHere(...);
                }
            ]
         })         
         * </code>
         */
        var evaluators = {

            /**
             * equals evaluator
             *
             * Avalia se um determinado valor é CORRESPONDENTE ao esperado.
             */
            equals: function(received) {
                return expectedValue == received;
            },

            /**
             * same evaluator
             *
             * Avalia se um determinado valor é EXATAMENTE igual ao esperado, e
             * isso inclue o TIPO e o CONTEÚDO.
             */
            same: function(received) {
                return expectedValue === received;
            },

            /**
             * contains evaluator
             *
             * Avalia se um determinado valor está CONTIDO na LISTA de valores
             * esperados. Nesse caso o valor experado deve ser um ARRAY.
             */
            contains: function(received) {
                throw new Error('appi.test#ExpectEvaluator#contains Not Implemented!');
            },

            /**
             * in evaluator
             *
             * Avalia se o valor esperado está presente em uma lista. Tal lista
             * deve ser um ARRAY.
             */
            in: function(received) {
                throw new Error('appi.test#ExpectEvaluator#in Not Implemented!');
            }
        };

        /* Lista de avaliadores de negação. São os mesmos `evaluators`, só que
         * inversos.
         */
        var notEvaluators = {};

        for(var evaluator in evaluators) {
            // TODO: Mudar para function inline dinâmica, para melhorar performance
            notEvaluators[evaluator] = new Function('received',
                'return !this.'+ evaluator + '(received);').bind(evaluators);
        }

        var makeEvaluator = function(evaluator) {
            return function(value) {
                /* TODO: Implementar TestError(expected, received)
                 * throw new TestError(expectedValue, value);
                 *
                 * TestError.message
                 * TestError.expected
                 * TestError.received
                 *
                 * TODO: Corrigir BUG em caso de erro com NOT evaluator. Deve apresentar algo como
                 *       Expected: NOT {VALUE} [type]
                 *       Received: {VALUE} [type]
                 */
                if(!evaluator(value))
                    throw new Error('Expected: ' + expectedValue  
                        + ' [' + (typeof expectedValue) + ']'+ '\n'
                        + 'Received: ' + value 
                        + ' [' + (typeof value) + ']');
            }
        };

        var expectEvaluator_ = {};

        // Exporting evaluators
        for(var evaluator in evaluators) {
            expectEvaluator_[evaluator] = makeEvaluator(evaluators[evaluator]);
        }

        // Exporting NOT evaluators
        expectEvaluator_.not = {};

        for(var notEvaluator in notEvaluators) {
            expectEvaluator_.not[notEvaluator] = makeEvaluator(notEvaluators[notEvaluator]);
        }

        return expectEvaluator_;
    }