(function () {
    'use strict';

    angular.module('Menu')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['items'];
    function CategoryController(items) {
        var category = this;
        category.items = items;
    }

})();
