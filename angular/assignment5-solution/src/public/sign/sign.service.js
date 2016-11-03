(function () {
    'use strict';

    angular.module('public')
        .service('SignService', SignService)
        .constant('ApiBasePath', "https://flo-ang-course5.herokuapp.com");

    SignService.$inject = ['$http', 'ApiBasePath']
    function SignService($http, ApiBasePath) {
        var service = this;
        var favoriteMenu;
        var registeredUser;
        var isNotSigned = true;

        service.registerUser = function (user) {
            isNotSigned = false;
            registeredUser = user;
        };

        service.isMenuExist = function (shortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items/" + shortName + ".json"),
            }).then(function () {
                //console.log("this menu exist");
                favoriteMenu =shortName;
                return true;
            })
                .catch(function () {
                    //console.log("this menu does not exist");
                    return false;
                });
        };

        service.getFavoriteMenu = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items/" + favoriteMenu + ".json")
            }).then(function (response) {
                var menu = angular.fromJson(response.data);
                return {
                    isNotSigned: isNotSigned,
                    user: registeredUser,
                    shortName: favoriteMenu,
                    title: menu.name,
                    description: menu.description,
                    categoryShortName: menu.category_short_name
                }
            })
                .catch(function (error) {
                    console.log("Something went terribly wrong: " + error);
                });
        }
    }
})();
