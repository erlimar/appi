# appi.sync / appi.async

Padrões para chamada de métodos síncronos e assíncronos com __appi__.
Esses padrões serão a base para a transparência no desenvolvimento de aplicações _locais (desktop)_, _mobile (embutidas)_ e _Web API's_.

Imagine que você têm um módulo já pronto (aqui vale ressaltar que, não importa se você está em uma aplicação _local_, _mobile_ ou _Web API_).

```js
var myModule = appi.import('mymodule');
```

De forma transparente você poderia simplesmente chamar um método qualquer:

```js
var result = myModule.method(param1, 'param 2');
```

Por trás dessa chamada, __appi__ irá garantir uma chamada síncrona padrão, bloqueando a execução do script até o retorno da mesma. Isso poderia ser feito de forma explícita usando o código abaixo:

```js
var result = appi.sync(myModule.method, param1, 'param 2');
```

Neste momento você deve estar se perguntando: "Que vantagem tem nisso?", chamadas síncronas são o padrão em qualquer linguagem, além do quê, a primeira chamada é muito mais legível, simples, enfim _"A MELHOR OPÇÃO"_.

Mas isso é relativo, se observarmos somente o caso onde _"chamamos"_ funções simples esse é realmente um pensamento razoável.

Mas falemos então sobre chamadas __assíncronas__. Você pode fazer uma de forma implícita assim:

```js
var myResult;
myModule.method('param', 'param 2', {
    ok: function(result){
        myResult = result;
    },
    error: function(exception){
        // catch exception here
    }
});
```

Sem _enrolação_, vejamos a forma _excplícita_ de fazermos uma chamada __assíncrona__ com o código abaixo:

```js
var myResult;
appi.async(myModule.method, param1, 'param 2', {
    ok: function(result){
        myResult = result;
    },
    error: function(exception){
        // catch exception here
    }
});
```

## Arrazoando sobre o assunto

Voltando a primeira pergunta: __"Que vantagem tem nisso?"__

Se você analisar bem os códigos de exemplo apresentados, vai perceber que __appi.sync__ e __appi.async__ são simplesmente dois mecanismos para chamar uma função _JavaScript_ qualquer e retornar seu resultado.

Uma (___appi.sync___) simplesmente chama a função, guarda o retorno fornecida pela mesma, e o retorna imediatamente para a função que a chamou.

A outra (___appi.async___) faz a mesma coisa, porém retorna imediatamente _(sempre que possível)_ mesmo antes de ter um retorno da funcção pretendida, e quando o retorno da mesma for detectado, esse será sinalizado através das funções _callback's_ passadas no __último parâmetro__ da função, que por sua vez deve ser um __objeto__ com a assinatura pré-definida como abaixo:

```js
{
    ok: function(){},
    error: function(){}
}
```

__Ainda não vê vantagem nisso?__ Pois bem, continuemos arrazoando sobre o assunto.

Em JavaScript, por padrão, quando falamos de assincronismo estamos nos referindo ao _famoso_ padrão __AJAX__.

> __AJAX__ - Acrônimo para _Assincronous JavaScript And XML_: Quem hoje já não faz mas tanto sentido o nome, porque não se trabalha somente com XML, o JSON por exemplo é muito mais útil nos dias atuais - Mas como já _pegou_ praquê mudar?)

Mas não fique _preso_ a este conceito, porque __appi__ foi pensada para ser uma bibliteca facilitadora no desenvolvimento de aplicações ___fronta end___, seja ela _local (Desktop ou Web Nativa)_, _mobile (embutida em aplicativos Android, iOS e Windows Phone - por exemplo, através de WebView)_ e até mesmo _Web API (quase o mesmo conceito de "local").

Quando trabalhamos com _JavaScript_ em um navegador padrão, é razoável pensarmos assim, porque operações assíncronas estão diretamente relacionadas a __AJAX__, mas a __File API__ também fornece estes recursos (essa é mais nova e talvez nem todos conheçam). Mas aplicações embutidas por exemplo, podem implementar como bem entender outros mecanismo que trabalhem de forma __assíncrona__ _(como uma função de pesquisa de determinado recurso por exemplo)_.

Partindo do entendimento que: "__appi__ não é restrita a uso em navegadores", é de se esperar que ela esteja preparada para trabalhos de forma síncrona e assíncrona. E esses dois métodos (__appi.sync__ e __appi.async__) são a base para abstração de um novo mecanismo de chamadas de funções dos dois tipos.

### Agora sim

Agora imagine que você entende os benefícios de se estar preparado para realizar chamada de funções dos dois tipos (_síncrona_ e _assíncrona_) e pretende trabalhar com elas. Então você precisa fazer uma chamada padrão _síncrona_, você pode usar as formas explícitas:

```js
// Chamada síncrona
var myResult = appi.sync(myModule.method, param1, 'param 2');

// Chamada assíncrona
var myResult;
appi.async(myModule.method, param1, 'param 2', {
    ok: function(result){
        myResult = result;
    }
});
```

Imagino que aqui você já consiga perceber os benefícios para chamadas assíncronas. É bem mais simples no exemplo acima, do que por exemplo, para uma chamada __AJAX__ usando __jQuery__:

```js
var myResult;
jQuery.ajax({
    url: 'http://mysite.com/myresource',
    success: function(xhrq, status, data){
        myResult = data;
    }
});
```

Em uma comparação superficial, podemos dizer que __appi.async__ é equivalente a __jQuery.ajax__, mas isso só se compararmos a chamada em si e esquecermos do outro mecanismo de abstração de __Web API__ que __appi__ fornece (na verdade os dois se complementam).

Essa porém é a forma _explícita_ de chamada de métodos usando __appi__. Mas como foi dito antes: "Esses padrões serão a base para a transparência no desenvolvimento de aplicações".

Você dificilmente irá fazer chamadas explícitas, normalmente você irá definir sua aplicação e seus módulos, e com isso __appi__ envolverá seus métodos nativos com essas chamadas, permitindo através de uma chamada simples entender implicitamente uma chamada síncrona e assíncrona.

Você pode usar as formas implícitas assim:

```js
// Chamada síncrona
var myResult = myModule.method(param1, 'param 2');

// Chamada assíncrona
var myResult;
myModule.method(param1, 'param 2', {
    ok: function(result){
        myResult = result;
    }
});
```

Pronto! A chamada ___síncrona___ foi resumida a uma chamada de método como o padrão _JavaScript_, e a chamada ___assíncrona___ foi também resumida a uma chamada padrão com a inclusão de um ___último parâmetro___ com assinatura específica.

## Resumo

O mecanismo de chamada de funções que __appi__ provê, simplifica as chamadas de métodos assíncronos.

Por trás o que __appi__ faz é simplesmente identificar a assinatura dos métodos em busca do último parâmetro, se encontrar a _assinatura assíncrona_ ela se encarrega de preparar o ambiente (seja para uma chamada _mobile embutida_, ou em uma _Web API_, ou seja qual for ele) realizar as chamadas e devolver o resultado conforme o esperado (através do RETURN para chamadas síncronas e através de CALLBACK quando assíncrona).

O mecanismo também se encarrega de identificar as exceções e informá-las através do canal mais adequado. Por exemplo:

* Se for uma chamada _síncrona_, a exeção é levantada normalmente e espera-se que o chamador a trate;
* Se for uma chamada _assíncrona_, e há o método __error__ definido, esse é sinalizado com o conteúdo da exceção via parâmetro; já se não houver a assinatura __error__ a exceção também será levantada normalmente (_Veja nota abaixo_).

> __NOTA:__ Fazer uma chamada ___assíncrona___ sem uma assinatura __error__ não é recomendável, porque a exceção será levantada no escopo global e a referência de quem levantou, onde e qual a possível causa será de difícil identificação. Então, __SEMPRE USE A ASSINATURA ERROR__.