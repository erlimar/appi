# appi.mobile

Os módulos podem ser vistos como extensão das funcionalidades da aplicação. E pode ser um ótimo auxiliar no desenvolvimento mobile, pois neste modelo de desenvolvimento é comum, por exemplo, o conceito de _Activity_ (Atividades), que por sua vez são vinculadas as _Views_ (telas). E uma ótima forma de organizar essas atividades (que podem ser vistas como módulos), é usando o conceito ___namespace___.

    appi.module('myapp.activities.myactivity', function(){
        // my activity code
    });

Nos códigos que utilizam os módulos de atividades, pode-se:

    appi.isolate(function(){
        var myActivity = appi.import('myapp.activities.myactivity');
        myActivity.callMethod();
    });

Ou se preferir pode importar um ___namespace___ completo:

    appi.isolate(function(){
        var activities = appi.import('myapp.activities');
        activities.myactivity.callMethod();
    });