(function () {
    'use strict';

    angular.module('public')
        .service('SignService', SignService)
        .constant('ApiBasePath', "https://flo-ang-course5.herokuapp.com");

    SignService.$inject = ['$http', 'ApiBasePath']
    function SignService($http, ApiBasePath) {
        var service = this;
        var favoriteMenu;

        service.getItemsForCategory = function (shortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items/" + shortName + ".json"),
            }).then(function () {
                console.log("this menu exist");
                favoriteMenu=shortName;
                return true;
            })
                .catch(function () {
                    console.log("this menu does not exist");
                    return false;
                });
        };
    }
})();
