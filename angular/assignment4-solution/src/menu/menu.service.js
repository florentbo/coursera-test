(function () {
    'use strict';

    angular.module('Menu')
        .service('MenuService', MenuService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuService.$inject = ['$http', 'ApiBasePath']
    function MenuService($http, ApiBasePath) {
        var service = this;
        var items = [];

        service.getCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                    items = response.data;
                    console.log("items in service: " + items.length);
                    return items;
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        };
    }
})();
