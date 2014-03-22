// Mock para appi.test
var appi = {
  test: {
    unit: function(defTest){
      this.session = {
        // TODO: Agrupar os cenários por COMPONENTE
        component: defTest.component,
        setup: defTest.setup(),
        scenarios: [defTest.scenario]
      };

      for(var scenario in this.session.scenarios) {
        scenario = this.session.scenarios[scenario];
        // Dados básicos
        var scenarioDescription = {
          component: this.session.component,
          name: scenario.name,
          description: scenario.description.join('\n'),
          premisses: []
        };
        // Premissas
        for(var premisse in scenario.premisses)
          scenarioDescription.premisses.push(premisse);
      };
      this.viewer.onLoaded(scenarioDescription);
    },

    viewer: {
      onLoaded: function(){},
      onRun: function(){}
    },

    run: function() {
      var args = [];
      for(var arg in arguments)
        args.push(arguments[arg]);
      this.viewer.onRun.apply(null, [this.session, args]);
    }
  }
};

// Registro de appi.test.viewer
appi.test.viewer.onLoaded = registeredOnLoaded;
appi.test.viewer.onRun = registeredOnRun;

// Configuração de um teste unitário
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

// Rodando os testes
appi.test.run('Vários', "Parâmetros", 0, 0.887);

// OnLoaded
function registeredOnLoaded(scenarios) {
  console.log('======================================================================');
  console.log('Teste para: ' + scenarios.component);
  console.log('----------------------------------------------------------------------');
  console.log(scenarios.name+':');
  console.log('\n');
  console.log(scenarios.description);
  console.log('\n');
  console.log('Premissas:');
  for(var premissa in scenarios.premisses)
    console.log('   * ' + scenarios.premisses[premissa]);
};

// OnRun
function registeredOnRun(session, params) {
  console.log('======================================================================');
  console.log('Rodando teste para: ' + session.component);
  console.log('----------------------------------------------------------------------');
}

// OnTest
//
// testInfo {
//   [string]  premisse,
//   [boolean] ok,
//   [float]   time,
//   [object]  expected,
//   [object]  result,
//   [object]  error
// }
//
function registeredOnTest(testInfo) {
  console.log('Premissa: ' + testInfo.premisse);
  console.log('----------------------------------------------------------------------');
}