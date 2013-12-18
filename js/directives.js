angular.module('directives', [])
    .directive('ngSparkline', function() {
        return {
            restrict: 'AECM',
            require: '^city',
            scope: {
                city: '@'
            },
            templateUrl: 'views/ng-sparkline.html'
        }
    })
