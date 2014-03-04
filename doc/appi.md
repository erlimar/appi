# appi

Utilitário para __clausure__ (isolamento de escopo).

    appi.isolate(function(scope){
        // using a module
        var utils = appi.import('utils');
        utils.trace('test');
    }, window);

Definição de módulos auxiliares.

    appi.module('utils', function(){
        // private methods
        function internalTrace(msg){
            console.log(msg);
        };
        // public methods and properties
        var __interface__ = {
            trace: function(message){
                internalTrace(message);
            }
        };
        return __interface__;
    });