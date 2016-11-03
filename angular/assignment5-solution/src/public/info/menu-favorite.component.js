(function () {
    "use strict";

    angular.module('public')
        .component('menuFavorite', {
            templateUrl: 'src/public/info/menu-favorite.html',
            bindings: {
                favorite: '=',
                myTitle: '@title',
                myFlorent: '@florent'
            }
        });


})();
