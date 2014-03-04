# appi.engines.web

Os __engines__ são a forma como __appi__ identifica como executar as operações com a aplicação (as chamadas assíncronas por exemplo). Existem dois _engines básicos_ disponíveis, __builtin__ e __web__.

Este documento descreve o engine __web__. O que ele faz, é basicamente transformar as _URL's_ e os _verbos HTTP_ em chamadas de funções e módulos da aplicação.

Um engine ___builtin___ pode ser configurado no setup assim:

    appi.setup({
        engine: appi.engines.builtin()
    });

Ou usando um identificador customizado:

    appi.setup({
        engine: appi.engines.builtin('customBuiltin')
    });

Ou use o engine __web__ para descrever uma ___Web API___ e ela será disponibilizada como sua aplicação.

    appi.setup({
        engine: appi.engines.web({
            url: 'http://api.my.com/v1',
            methods: [
                // custom method
                getVersion: function(){},
                // custom entity methods
                person: {
                    byId: function(personId){},
                    create: function(person){
                        return {
                            personName: person.lastName + ', ' + person.firstName
                        }
                    }
                }
                // using a CRUD helper for generate a entity methods
                entity: appi.web.crud(function(request){
                    // FIXME: Verificar a possibilidade de permitir a
                    //        identificação e customização, por exemplo, do
                    //        verbo HTTP e a montagem da URL. Por exemplo:
                    if(request.action == appi.web.crudAction.CREATE)
                        return {
                            makeUrl: function(data){},
                            verb: appi.web.verb.CREATE
                        }
                })
            ]
        }),
        appName: 'MyApp'
    });

Você pode definir uma parte específica da _Web API_ como um módulo com a mesma facilidade:

    appi.web.module('contacts', function(){
        return {
            getAll: function(){},
            delete: function(id){}
        }
    });

Observe que nós declaramos as funções da aplicação e dos módulos _(Ex: __getVersion: function(){}__)_ e não definimos seu ___corpo___. Isso não é só um exemplo, __appi__ utiliza essa declaração (veja __appi.describeFunction()__) para saber que método chamar na API. Uma chamada a um desses métodos irá gerar uma requisição a uma URL específica passando os parâmetros como dados da requisição e transformando o resultado da mesma para dados de retorno da própria função.

Veja como a utilização de uma ___Web API___ agora fica muito mais fácil:

    var version = MyApp.getVersion();
    var person = MyApp.person.create({
        firstName: 'Erlimar',
        lastName: 'Campos'
    });

Só essas chamadas são suficientes para __appi__ entender que deve gerar requisições para as _URL's_ ___http://api.my.com/v1/getVersion___ e ___http://api.my.com/v1/person/create?personName=Campos, Erlimar___.

> __Observe:__ A declaração da função correspondente à __person.create__ também tem uma definição que concatena o __firstName__ e __lastName__ para formar um parâmetro __personName__. Esse por sua vez, não é um dado que é retornado pela chamada à própria função, mas retorna uma transformação de dados que é repassada a chamada à ___Web API___, por isso __personName=Campos, Erlimar__ é passado na URL.

O que o helper __appi.web.crud()__ faz, é simplesmente gerar algumas funções básicas para simular as operações de _CRUD (Create, Read, Update and Delete)_ para uma entidade por exemplo, veja como a simples declaração __entity: appi.web.crud()__ que usamos acima facilita nossa vida:

    var myEntity = MyApp.entity.create({a: 'A value', b: 'B value'});
    myEntity.b = 'id: ' + myEntity.id;

    MyApp.entity.update(myEntity);
    var allEntities = MyApp.entity.read();
    MyApp.entity.delete(myEntity.id);

Todas as operações acima foram possíveis apenas por utilizar o helper __appi.web.crud()__.

Os módulos web podem ser utilizados da mesma forma como os demais módulos são utilizados:

    var mContacts = appi.import('contacts');

    var contacts = mContacts.getAll();
    mContacts.delete(contacts[0].id);