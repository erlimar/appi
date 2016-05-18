    /**
     * setup
     *
     * Implementa IViewer.setup
     *
     * <code>
     Component {
         id: 'int',
         name: 'string',
         scenarios: [
             {
                 id: 'int',
                 name: 'string',
                 description: 'string',
                 premisses: [
                     {
                         id: 'int',
                         name: 'string'
                     },
                   ...
                 ]
             },
             ...
         ]
     }
     * </code>
     *
     * @param {Component[]}   testInfo   Dados dos componentes sendo testados
     * @param {Array}         params     Parâmetros passados na chamada de 'appi.test.run(...)'
     */
    function setup(testInfo, params){
        console.log('setup: ' + params);
    }