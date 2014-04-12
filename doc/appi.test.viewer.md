# appi.test.viewer

A biblioteca de testes __appi.test__ não se preocupa em como os resultados dos testes serão visualizados, isso porque entende que se trata de uma tarefa à parte da execução dos próprios testes.

A __appi.test__ disponibiliza um mecanismo de extensão onde um __viewer__ pode ser incorporado ao subsitema de testes e extendido conforme suas necessidades. Um __viewer__ para testes em um __navegador__ deve ser totalmente diferente de um __viewer__ para testes em um console do __Noje.js__ por exemplo.

__Appi__ já provê uma implementação básica de **viewer** para cada um dos mecanismos mais comuns, são eles:

- `appi.test.viewer-html.js` para visualizar testes em um navegador Web
- `appi.test.viewer-node.js` para visualizar testes em um console do Node.js

Vejamos abaixo como seria a utilização de um __viewer HTML__ em um _navegador_:
```html
<!DOCTYPE html>
<html>
<head>
    <script src="appi.js"></script>
    <script src="appi.test.viewer-html.js"></script>
    <script src="component.tests.js"></script>
</head>
<body>
    <div id="mytestview"></div>
    <script>
        appi.test.run('mytestview');
    </script>
</body>
</html>
```

Uma chamada a __appi.test.run()__ repassa todos os parâmetros recebidos a um __view.setup()__ registrado que os utiliza da forma como bem entender. Neste caso hipotético, podemos imaginar que o __viewer__ registrado espera receber o _ID_ de um elemento _HTML_ para montar o ambiente de visualização. A chamada também se encarrega de iniciar a execução dos testes.