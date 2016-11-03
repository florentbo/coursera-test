(function () {
    "use strict";

    angular.module('public')
        .controller('FavoriteController', FavoriteController);

    FavoriteController.$inject = ['favoriteMenu'];
    function FavoriteController(favoriteMenu) {
        var favorite = this;
        favorite.favoriteMenu = favoriteMenu;
        console.log(favorite);
        console.log(favoriteMenu);
    }

})();
