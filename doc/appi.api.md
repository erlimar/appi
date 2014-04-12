# Referência da API

## appi.env[]

Array com variáveis de ambiente da aplicação

## appi.setup()

Realiza o setup da aplicação. Deve ser chamada antes de qualquer utilização.

### Parâmetros:

* __@settings__ _[ISettings]_ Configurações do Setup com a seguinte interface.

#### Definição de __ISettings__:

* __scope__ _[object]_ Objeto de escopo do aplicativo. Normalemente 'window'

* __appName__ _[string:optional]_ Nome do aplicativo, seguindo os padrões de nome para identificadores JavaScript. Este será o nome disponível no escopo da aplicação. Que retornará a interface do aplicativo. Se um nome não for informado, 'App' será considerado.

* __appMock__ _[object:optional]_ Objeto Mock do aplicativo, para uso no momento do desenvolvimento. Este objeto substituirá o objeto 'builtin' durante a fase de desenvolvimento. O objeto 'builtin' é fornecido diretamente no escopo principal quando a aplicação for embutida no App final. Se não informado um objeto vazio será considerado, porém o aplicativo não terá nenhuma funcionalidade.

* __builtinName__ _[string]_ Por padrão '__builtin__' é considerado o objeto da aplicação embutido no App final, mas pode ser alterado conforme necessidade através dessa configuração.

* __environment__ _[object:optional]_ Objeto com definições de ambiente, ou uma função que retorna esse objeto.

## appi.trace()

Um atalho para 'console.log' quando o mesmo estiver disponível. Imprime todos os argumentos passados, um a um, em cada linha.

### Parâmetros:

* __@...__ _[any]_ Quantos parâmetros precisar

## appi.isolate()

Provê o conceito de ___clausure___ para executar uma parte de código isolada de um outro escopo qualquer. Além fazer com que a declaração e execução de métodos seja mais intuitiva para os menos acostumados com JavaScript, ou, para os já acostumados, deixa o código ficar mais "clean" e "verbal".

Ao invés de utilizar uma declaração como:

```js
(function(){
  // Seu código
})()
```

Ou

```js
+function(){
  // Seu código
}()
```

Você pode usar:

```js
api.isolate(function(){
  // Seu código
})
```

Se preferir pode usar várias funções em lote:

```js
api.isolate(
  function(){
    // Seu código #1
  },
  function(){
    // Seu código #2
  }
)
```

### Parâmetros

* __@...__ _[function]_ Quantas funções forem necessárias. Cada uma será executada em um escopo isolado.
* __@...__ _[NOT function]_ Outros parâmetros também podem ser passados. Quaisquer parâmetros não função serão repassados a todas as funções de isolamento.

##appi.module()
`UNDONE` Define um novo módulo auxiliar para a aplicação

## appi.timer()

Executa um callback após se esgotar o tempo definido em @timeOut.

### Parâmetros:

* __@timeOut__ _[int]_   Tempo em milisegundos para aguardar antes de executar o @callback.

* __@callback__ _[function]_ Callback para executar

* __@counter__ _[int]_ Informa quantas vezes o callback deve ser executado até o processo ser descartado. Se nenhum valor for informado, ou se um valor menor ou igual a 0 (zero) for informado, -1 será  considerado. Caso o valor considerado seja -1, o callback será executado ininterruptamente, ou até ser cancelado explicitamente.

* __@data__  _[any]_ Dados extra que serão repassados ao callback.

* __@return__  Retorna o Handle do timer criado, para que possa ser cancelado explicitamente.

## appi.isUndefined()

Verifica se um objeto/variável é indefinido.

Existem várias formas de se verificar se um determinado identificador está definido no escopo JavaScript, esta função garante o melhor uso, além de simplificar o trabalho.

### Parâmetros:

* __@varObject__ _[any]__  Qualquer identificador de variável.

* __@return__ TRUE ou FALSE

## appi.isString()

Verifica se um objeto/variável é uma string.

### Parâmetros:

* __@varObject__ _[any]_ Qualquer identificador de variável.

* __@return__ TRUE ou FALSE

## appi.isNumber()

Verifica se um objeto/variável é um número.

### Parâmetros:

* __@varObject__ _[any]_ Qualquer identificador de variável.

* __@return__ TRUE ou FALSE

## appi.isFunction()

Verifica se um objeto/variável é uma função.

### Parâmetros:

* __@varObject__ _[any]_ Qualquer identificador de variável.

* __@return__ TRUE ou FALSE

## appi.describeFunction()

Descreve/Deserializa uma função, identificando seu nome e parâmetros declarados.

### Parâmetros:

* __@funcObject__ _[function]_ Objeto de função para descrever

* __@return__ _[IFunctionDescriptor]_ Descritor da função

#### Definição de __IFunctionDescriptor__:

* __name__ _[string]_ Nome da função. Ou null se for uma função anônima.
* __params__ _[Array]_ Lista com nome dos parâmetros.