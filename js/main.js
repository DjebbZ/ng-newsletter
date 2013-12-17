var apiKey  = 'MDEyODA4MzMzMDEzODcyODYxMjlkNzhmYg001',
    npUrl   = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

angular.module('myApp', [])
    .controller('PlayerController', ['$scope', '$http', function($scope, $http) {
        $scope.roommates = [
            {name: 'Ari'},
            {name: 'Q'},
            {name: 'Sean'},
            {name: 'Anand'}
        ];
        $scope.people = {
            'Ari': 'orange',
            'Q': 'green',
            'Sean': 'blue',
            'Anand': 'red'
        };
        $http({
            method: 'JSONP',
            url: npUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
        }).success(function(data, status) {
            $scope.programs = data.list.story;
        }).error(function(data, status) {
            $scope.programs = data;
        })
    }]);
