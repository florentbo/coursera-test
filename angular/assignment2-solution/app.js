(function () {
    'use strict';

    var shoppingList = [
        {
            name: "Milk",
            quantity: "2"
        },
        {
            name: "Golf balls",
            quantity: "77"
        },
        {
            name: "Donuts",
            quantity: "200"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        }
    ];

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var shoppingList = this;

        shoppingList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

        shoppingList.moveItem = function (itemIndex) {
            ShoppingListCheckOffService.moveItem(itemIndex);
        };

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var shoppingList = this;

        shoppingList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var toBuyItems = shoppingList;
        var boughtItems = [];

        /*service.addItem = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            items.push(item);
        };

        service.removeItem = function (itemIdex) {
            items.splice(itemIdex, 1);
        };*/


        service.moveItem = function (itemIndex) {
            var item = toBuyItems[itemIndex];
            toBuyItems.splice(itemIndex, 1);
            boughtItems.push(item);
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };
    }
})();
