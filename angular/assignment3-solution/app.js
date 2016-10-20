(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemsList.html',
            scope: {
                items: '<',
                onRemove: '&'
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
        var service = MenuSearchService;

        list.choice = "";
        list.items = [];
        list.checkNothing = false;

        list.searchItem = function () {
            if (isEmpty(list.choice)) {
                list.checkNothing = true;
            }
            else {
                service.getMatchedMenuItems(list.choice).then(function (result) {
                    list.items = result;
                    if (list.items.length === 0)
                        list.checkNothing = true;
                });
            }
        };

        list.removeItem = function (itemIndex) {
            service.removeItem(itemIndex);
        };
    }

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        var items = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                var menu_items = angular.fromJson(response.data.menu_items);

                for (var i = 0; i < menu_items.length; i++) {
                    var menu_item = menu_items[i];
                    if (menu_item.description.toLowerCase().indexOf(searchTerm) != -1) {
                        items.push(menu_item);
                    }
                }
                return items;
            })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };
    }
})();
