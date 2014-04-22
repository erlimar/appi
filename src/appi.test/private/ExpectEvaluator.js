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
    function ExpectEvaluator(expectedValue) {
        // Selftest
        if (arguments.length !== 1)
            throw 'appi.test#ExpectEvaluator argument signature is invalid';

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
                if(!Array.isArray(expectedValue) && typeof expectedValue !== typeof '')
                    throw new Error('appi.test#ExpectEvaluator#contains @expectedValue is not a Array or String!');

                return !(0 > expectedValue.indexOf(received));
            },

            /**
             * in evaluator
             *
             * Avalia se o valor esperado está presente em uma lista. Tal lista
             * deve ser um ARRAY.
             */
            in: function(received) {
                if(!Array.isArray(received) && typeof received !== typeof '')
                    throw new Error('appi.test#ExpectEvaluator#in @received is not a Array or String!');

                return !(0 > received.indexOf(expectedValue));
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
                 *
                 * TODO: Melhorar a forma como as mensagens são apresentadas. A mesma não faz sentido
                 *       quando usadas com os avaliadores "contains" e "in" por exemplo.
                 */
                if(!evaluator(value))
                    throw new Error('Expected: ' + expectedValue  
                        + ' <' + (typeof expectedValue).toUpperCase() + '>'+ ', '
                        + 'Received: ' + value 
                        + ' <' + (typeof value).toUpperCase() + '>');

                /* Retornamos o próprio SET de avaliadores para permitir o uso "aninhado" de
                 * testes:
                 *
                 * <code>
                 this.expected(X)
                     .equals(Y)
                     .not.equals(Z)
                     .same(W);
                 * </code>
                 */
                return expectEvaluator_;
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