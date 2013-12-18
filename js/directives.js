angular.module('directives', [])
    .directive('ngSparkline', function() {
        return {
            restrict: 'AECM',
            require: '^ngModel',
            scope: {
                city: '=ngModel',
                lolify: '&'
            },
            templateUrl: 'views/ng-sparkline.html'
        }
    })
    .controller('ScopeCtrl', ['$scope', function($scope) {
        $scope.lolify = function(text) {
            if (text) return text + ' KIKOU-LOL!!'
        }
    }])
