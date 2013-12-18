angular.module('directives', [])
    .directive('city', function() {
        return {
            controller: function() {}
        }
    })
    .directive('ngSparkline', function() {
        return {
            restrict: 'AECM',
            require: '^city',
            scope: {
                city: '@'
            },
            templateUrl: 'views/ng-sparkline.html',
            controller: ['$scope', '$http', function($scope, $http) {
                var url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&callback=JSON_CALLBACK&q='

                $scope.getTemp = function(city) {
                    $http({
                        method: 'JSONP',
                        url: url + city
                    }).success(function(data) {
                        console.log(data)
                        var weather = [];
                        angular.forEach(data.list, function(value) {
                            weather.push(value)
                        })
                        $scope.weather = weather
                    })
                }
            }],
            link: function(scope, iElement, iAttrs, ctrl) {
                scope.getTemp(iAttrs.city)
            }
        }
    })
