var myMod = angular.module('myMod', ['ngRoute']);
myMod.component('home', {
    template: '<h1>Home</h1><p>Hello, {{ $ctrl.user.name }} !</p>',
    bindings: {
        user: '<'
    }
});
myMod.config(function($routeProvider) {
    $routeProvider.when('/', {
        template: '<home user="$resolve.user"></home>',
        resolve: {
            user: function($http) { return $http.get('...'); }
        }
    });
});

//http://stackoverflow.com/questions/38346600/angular-1-5-components-with-ui-router-resolve-unknown-provider
//http://www.codelord.net/2016/10/25/configuring-components-with-ui-router-and-ngroute/