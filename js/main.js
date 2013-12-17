angular.module('myApp', [])
    .run(function($rootScope) {
        $rootScope.name = "Ari Lerner";
    })
    .controller('MyController', function($scope) {
        $scope.person = {
            name: "Ari Lerner"
        };
    });
