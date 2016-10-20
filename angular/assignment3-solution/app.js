(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemsList.html',
            scope: {
                items: '<'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;

        list.choice = "";

        var service = MenuSearchService;

        list.items = service.getItems();

        list.searchItem = function () {
            console.log("hello searchItem: " +  list.choice);
            service.getMatchedMenuItems(list.choice);
        };

        list.removeItem = function (itemIndex) {
            console.log("'this' is: ", this);
            /*this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            this.title = origTitle + " (" + viewList.items.length + " items )";*/
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        var items = [];

        service.getMatchedMenuItems = function (searchTerm) {
            var promise = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            });

            promise.then(function (response) {
                    console.log("hello promise");
                    var menu_items = angular.fromJson(response.data.menu_items);

                    for (var i = 0; i < menu_items.length; i++) {
                        var description = menu_items[i].description;
                        if (description.toLowerCase().indexOf(searchTerm) != -1){
                            //console.log("push : " + description);
                            items.push(description);
                        }
                    }
                    console.log("found : " + items);
                    return items;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        };

        service.getItems = function () {
            return items;
        };
    }
})();
