(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.messageContent = "";
        $scope.messageStyle = "";
        $scope.dishes = "";

        $scope.displayMessage = function () {
            var message = chooseMessage($scope.dishes);
            $scope.messageContent = message.content;
            $scope.messageStyle = message.style;
        };

        function chooseMessage(dishes) {
            var comma = ',';
            var enjoy = "Enjoy!";
            var tooMuch = "Too much!";
            var enterData = "Please enter data first";
            var danger = "red";
            var success = "green";

            if (!dishes) {
                return {
                    content: enterData,
                    style: danger
                }
            } else {
                var dishesList = dishes.split(comma);
                var filteredArray = [];
                angular.forEach(dishesList, function (item) {
                    if (item.trim()) filteredArray.push(item);
                });
                var dishesListLength = filteredArray.length;
                return {
                    content: dishesListLength > 3 ? tooMuch : enjoy,
                    style: success
                }
            }

        }
    }
})();
