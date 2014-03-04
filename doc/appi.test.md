# appi.test

Essa é uma biblioteca auxiliar para __appi__, foi escrita para permitir a realização de testes de básicos de unidade, no desenvolvimento da própria __appi__.

    appi.test.unit({
        component: 'appi.describeFunction',
        setup: function(){
            // prepare environment here
        },
        scenaries: [
            'Scenary A' = function(){
                test('Test case #1', function(){
                    // success test
                    expected('3').equals(1+2);
                    expected('a').notEquals('A');
                    // exception test
                    expected('3').same(1+2);
                });
            }
        ]
    });