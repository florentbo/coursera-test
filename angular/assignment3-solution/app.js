(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        return {
            templateUrl: 'foundItemsList.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
    }

    function FoundItemsDirectiveController() {
        var list = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;

        list.choice = "";

        list.searchItem = function () {
            var foundItems = MenuSearchService.getMatchedMenuItems(list.choice);

            if (foundItems) {
                foundItems.then(function (result) {
                    list.items = result;
                    list.checkNothing = result.length === 0;
                });
            } else {
                list.checkNothing = true;
            }
        };
        list.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };
    }

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    function isNotEmpty(str) {
        return !isEmpty(str);
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var items = [];

        service.getMatchedMenuItems = function (searchTerm) {
            if (isNotEmpty(searchTerm)) {
                return $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                }).then(function (response) {
                        var menu_items = angular.fromJson(response.data.menu_items);
                        items.length = 0;

                        for (var i = 0; i < menu_items.length; i++) {
                            var menu_item = menu_items[i];
                            if (menu_item.description.toLowerCase().indexOf(searchTerm) != -1) {
                                items.push(menu_item);
                            }
                        }
                        console.log("items: " + items.length);
                        return items;
                    })
                    .catch(function (error) {
                        console.log("Something went terribly wrong.");
                    });

            } else {
                return false
            }
        };

        service.getItems = function () {
            return items;
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };
    }
})();
