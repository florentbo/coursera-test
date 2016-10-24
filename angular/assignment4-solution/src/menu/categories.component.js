(function () {
    'use strict';

    angular.module('Menu')
        .component('categories', {
            templateUrl: 'src/menu/templates/categories.template.html',
            bindings: {
                items: '<'
            }
        });

})();
