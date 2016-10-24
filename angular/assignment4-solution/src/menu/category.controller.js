(function () {
    'use strict';

    angular.module('Menu')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['item'];
    function CategoryController(item) {
        var category = this;
        category.items = item;
    }

})();
