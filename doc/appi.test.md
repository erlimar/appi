# appi.test

Essa é uma biblioteca auxiliar para __appi__, foi escrita para permitir a realização de testes de básicos de unidade, no desenvolvimento da própria __appi__.

### Exemplo:

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
                'Premissa A'
                : function(environment) {
                },

                'Premissa B'
                : function(environment) {
                    expected(2).equals('1' + '1');
                    exception(function(){
                      new MyException('ops!');
                    }).same(new MyException('ops!'));
                },

                'Premissa C'
                : function(environment) {
                }
            }
        }
    });


### Gráfico de dependências

                                  +============+
                                  | SESSION    |
                                  +============+
                          +-----@ | components |
                          |       +============+
                          |
                          |
                          |
        +===========+     |
        | COMPONENT | <<--+
        +===========+            +=============+
        | name      |     +---<< | CENARIO     |
        +-----------+     |      +=============+             +==========+
        | cenarios  | @---+      | name        |     +----<< | PREMISSE |
        +===========+            +-------------+     |       +==========+
                                 | description |     |       | name     |
                                 +-------------+     |       +----------+
                                 | premisses   | @---+       | callback |
                                 +-------------+             +==========+
                                 | environment |
                                 +-------------+
                                 | setup       |
                                 +=============+

Isso seria um resultado previsto:

    Component I
      /--- Cenario A
              /--- Premisse A.1 [ok]
               --- Premisse A.2 [ok]
      /--- Cenario B
              /--- Premisse B.1 [fail]
               --- Premisse B.2 [ok]
    Component II
      /--- Cenario A
              /--- Premisse A.1 [fail]
      /--- Cenario B
              /--- Premisse B.1 [ok]
               --- Premisse B.2 [ok]
