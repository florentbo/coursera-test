(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.name = "";
  $scope.totalValue = 0;
  $scope.displayNumeric = function () {
    var totalNameValue = calulNumericForString($scope.name)
      $scope.totalValue= totalNameValue;

  };

  function calulNumericForString(string) {
      var totalStringValue = 0;
      for (var i = 0; i < string.length; i++) {
          totalStringValue += string.charCodeAt(i);
      }

      return totalStringValue;
  }
});

})();
