angular.module('directives', [])
    .directive('ngSparkline', function() {
        return {
            restrict: 'AECM',
            require: '^ngModel',
            scope: {
                ngModel: '='
            },
            templateUrl: 'views/ng-sparkline.html'
        }
    })
