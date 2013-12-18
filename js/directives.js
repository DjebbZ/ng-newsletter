angular.module('directives', [])
    .directive('ngSparkline', function() {
        return {
            restrict: 'AECM',
            require: '^city',
            scope: {
                city: '@'
            },
            templateUrl: 'views/ng-sparkline.html',
            controller: ['$scope', '$http', function($scope, $http) {
                $scope.getTemp = function(city) {}
            }],
            link: function(scope, iElement, iAttrs, ctrl) {
                scope.getTemp(iAttrs.city)
            }
        }
    })
