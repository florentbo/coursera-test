(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService);


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var shoppingList = this;

        shoppingList.found = MenuSearchService.getMatchedMenuItems(searchTerm);



    }

    function MenuSearchService() {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            console.log("hello florent");
        };

    }

})();
