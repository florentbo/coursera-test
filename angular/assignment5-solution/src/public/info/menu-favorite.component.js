(function () {
    "use strict";

    angular.module('public').component('fav', {
        templateUrl: 'src/public/info/menu-favorite.html',
        bindings: {favorite: '='}
    });
})();
