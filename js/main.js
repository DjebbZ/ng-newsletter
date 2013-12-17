angular.module('myApp', [])
    .run(function($rootScope) {
        $rootScope.name = "Ari Lerner";
    })
    .controller('MyController', function($scope) {
        $scope.person = {
            name: "Ari Lerner"
        }
    })
    .controller('ParentController', function($scope) {
        $scope.person = {
            greeted: false
        }
    })
    .controller('ChildController', function($scope) {
        $scope.sayHello = function() {
            $scope.person.greeted = true;
        }
    });
