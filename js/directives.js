angular.module('directives', [])
    .directive('city', function() {
        return {
            controller: function() {}
        }
    })
    .factory('openweathermap', ['$http', function($http) {
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q='

        var doRequest = function(city) {
            return $http({
                method: 'JSONP',
                url: url + city
            })
        }

        return doRequest
    }])
    .directive('ngSparkline', function() {
        return {
            restrict: 'A',
            require: '^city',
            scope: {
                city: '='
            },
            templateUrl: 'views/ng-sparkline.html',
            controller: ['$scope', 'openweathermap', function($scope, openweathermap) {
                $scope.getTemp = function(city) {
                    openweathermap(city).success(function(data) {
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
                scope.$watch('city', function(newValue) {
                    if (newValue) scope.getTemp(newValue)
                })

                scope.$watch('weather', function(newValue) {
                    var highs   = []

                    if (newValue) {
                        angular.forEach(scope.weather, function(value){
                            highs.push(value.temp.max)
                        });
                        chartGraph(iElement, highs, iAttrs)
                    }
                });
            }
        }
    })

// d3 chart
var chartGraph = function(element, data, opts) {
  var width = opts.width || 200,
      height = opts.height || 80,
      padding = opts.padding || 30;

  // chart
  // remove previous chart if any
  d3.select('svg').remove();
  // draw new chart
  var svg     = d3.select(element[0])
                  .append('svg:svg')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('class', 'sparkline')
                  .append('g')
                    .attr('transform', 'translate('+padding+', '+padding+')');

  svg.selectAll('*').remove();

  var maxY    = d3.max(data),
      x       = d3.scale.linear()
                  .domain([0, data.length])
                  .range([0, width]),
      y       = d3.scale.linear()
                  .domain([0, maxY])
                  .range([height, 0]),
      yAxis = d3.svg.axis().scale(y)
                    .orient('left')
                    .ticks(5);

  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);

  var line    = d3.svg.line()
                  .interpolate('linear')
                  .x(function(d,i){return x(i);})
                  .y(function(d,i){return y(d);}),
      path    = svg.append('svg:path')
                    .data([data])
                    .attr('d', line)
                    .attr('fill', 'none')
                    .attr('stroke', 'black')
                    .attr('stroke-width', '1');
}
