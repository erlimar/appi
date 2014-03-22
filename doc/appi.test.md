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

Outra opção:

    appi.test.unit({

      component: 'Componente de Mock',

      setup: function(){
        var environment_ = {
          valueA: 'Valor de A',
          valueB: 'Valor de B',
          numbers: [98, 8, 4, 59, 10]
        };
        return  environment_;
      },

      scenario: {
        name: 'Caminho Feliz!',
        description: [
          'Partindo do pré-suposto que o usuário irá sempre fazer o que se espera',
          'que ele faça, e você pode duvidar que isso aconteça. As premissas devem',
          'ser atendidas perfeitamente.'
        ],
        premisses: {
          
          'Premissa A': function(environment) {
          },
          
          'Premissa B': function(environment) {
            expected(2).equals('1' + '1');
            exception(function(){
              new MyException('ops!');
            }).same(new MyException('ops!'));
          },
          
          'Premissa C': function(environment) {
          }
        }
      }
    });