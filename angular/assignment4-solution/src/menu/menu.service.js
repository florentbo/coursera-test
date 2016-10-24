(function () {
    'use strict';

    angular.module('Menu')
        .service('MenuService', MenuService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuService.$inject = ['$http', 'ApiBasePath']
    function MenuService($http, ApiBasePath) {
        var service = this;
        //var items = [];

        service.getCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                    var items = response.data;
                    console.log("items in getCategories: " + items.length);
                    return items;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        };

        service.getItemsForCategory = function (shortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json"),
                params: {
                    category: shortName
                }
            }).then(function (response) {
                    var items = response.data;
                    console.log("items in getItemsForCategory: " + items.length);
                    return items;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        };
    }
})();
