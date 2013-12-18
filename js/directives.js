angular.module('directives', [])
    .directive('ngSparkline', function() {
        return {
            restrict: 'AECM',
            templateUrl: 'views/ng-sparkline.html'
        }
    })
