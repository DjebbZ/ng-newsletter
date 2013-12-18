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
                var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q='

                $scope.getTemp = function(city) {
                    $http({
                        method: 'JSONP',
                        url: url + city
                    }).success(function(data) {
                        console.log(data)
                        var weather = [];
                        angular.forEach(data.list, function(value){
                            weather.push(value)
                        });
                        $scope.weather = weather
                    })
                }
            }],
            link: function(scope, iElement, iAttrs, ctrl) {
                scope.getTemp(iAttrs.city)
                scope.$watch('weather', function(newValue, oldValue, scope) {
                    var highs   = []

                    if (newValue) {
                        angular.forEach(scope.weather, function(value, key){
                            highs.push(value.temp.max)
                        });
                    }
                });
            }
        }
    })
