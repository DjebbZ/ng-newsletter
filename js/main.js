var apiKey  = 'MDEyODA4MzMzMDEzODcyODYxMjlkNzhmYg001',
    npUrl   = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

angular.module('myApp', [])
    .controller('PlayerController', ['$scope', '$http', function($scope, $http) {
        $scope.playing = false;
        var audio = document.createElement('audio');

        $scope.play = function(program) {
            if ($scope.playing) audio.pause();
            var url = program.audio[0].format.mp4.$text;
            audio.src = url;
            audio.play();
            $scope.playing = true;
        };

        $http({
            method: 'JSONP',
            url: npUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
        }).success(function(data, status) {
            $scope.programs = data.list.story;
        }).error(function(data, status) {
            $scope.programs = data;
        })
    }])
    .controller('ServiceController', ['$scope', '$timeout', 'githubService', function($scope, $timeout, gh) {
        var timeout;

        $scope.$watch('username', function(newVal) {
            if (newVal) {
                if (timeout) $timeout.cancel(timeout);

                timeout = $timeout(function() {
                    gh.events(newVal).success(function(data) {
                        $scope.events = data.data;
                    });
                }, 350);
            }
        });
    }])
    .directive('nprLink', function() {
        return {
            restrict: 'EA',
            require: ['^ngModel'],
            replace: true,
            scope: {
                ngModel: '=',
                play: '&'
            },
            templateUrl: '/views/nprListItem.html',
            link: function(scope, el, attr) {
                scope.duration = scope.ngModel.audio[0].duration.$text;
            }
        }
    })
    .factory('githubService', ['$http', function($http) {
        var doRequest = function(username, path) {
            return $http({
                method: 'JSONP',
                url: 'https://api.github.com/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
            });
        };

        return {
            events: function(username) { return doRequest(username, 'events'); }
        }
    }]);
