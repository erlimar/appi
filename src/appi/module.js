    /**
     * appi.module
     *
     * @description
     *
     * UNDONE: Ideia para criar um novo módulo
     */
    function module() {
        trace('Ideia appi.module');

        /*
         * A ideia é, que os módulos possam de alguma forma
         * ser integrados a applicação principal.
         *
         * Sendo ela um Mock ou um __bultin__.
         *
         * Na verdade um appi.module funcionará como um ponto
         * de extensão da App. De forma que o __builtin__ fica
         * sendo o "core back-end" da applicação, e os módulos
         * são extensões específicas do front-end.
         *
         * Pode ser utilizado da seguinte forma:
         *
         * var m1 = appi.import('modulename');
         *
         * m1.useModule( m1.var );
         */

        /*
          appi.module('moduleName', function () {

            return {
              variable: 'My variable',

              func: function () {
                return 'My function';
              }
            };
          });
        */
    }