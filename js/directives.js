angular.module('directives', [])
    .directive('ngSparkline', function() {
        return {
            restrict: 'AECM',
            template: '<div class="sparkline"></div>'
        }
    })
