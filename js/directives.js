angular.module('directives', [])
    .directive('ngSparkline', function() {
        return {
            restrict: 'A',
            template: '<div class="sparkline"></div>'
        }
    })
