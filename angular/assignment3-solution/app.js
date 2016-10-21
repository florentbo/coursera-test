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
        var service = MenuSearchService;

        list.choice = "";
        list.items = [];
        list.checkNothing = false;

        list.searchItem = function () {
            if (isEmpty(list.choice)) {
                list.checkNothing = true;
                list.items = [];
            }
            else {
                service.getMatchedMenuItems(list.choice).then(function (result) {
                    list.items = result;
                    if (list.items.length === 0) {
                        list.checkNothing = true;
                        list.items = [];
                    } else {
                        list.checkNothing = false;
                    }
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

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                    var items = [];
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
