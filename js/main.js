var apiKey  = 'MDEyODA4MzMzMDEzODcyODYxMjlkNzhmYg001',
    npUrl   = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

angular.module('myApp', [])
    .controller('PlayerController', ['$scope', '$http', 'player', function($scope, $http, player) {
        $scope.player = player;

        $http({
            method: 'JSONP',
            url: npUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
        }).success(function(data, status) {
            $scope.programs = data.list.story;
        }).error(function(data, status) {
            $scope.programs = data;
        })
    }])
    .factory('audio', ['$document', function($document) {
        return $document[0].createElement('audio');
    }])
    .factory('player', ['audio', '$rootScope', function(audio, $rootScope) {
        var player = {
            playing: false,
            current: null,
            ready: false,

            play: function(program) {
                if (player.playing) player.stop();
                var url = program.audio[0].format.mp4.$text;
                player.current = program;
                audio.src = url;
                audio.play();
                player.playing = true;
            },

            stop: function() {
                if (player.playing) {
                    audio.pause();
                    player.ready = player.playing = false;
                    player.current = null;
                }
            },

            currentTime: function() {
                return audio.currentTime;
            },

            currentDuration: function() {
                return parseInt(audio.duration);
            }
        };

        audio.addEventListener('ended', function() {
            $rootScope.$apply(player.stop());
        });

        audio.addEventListener('timeupdate', function() {
            $rootScope.$apply(function() {
                player.progress = player.currentTime();
                player.progress_percent = player.progress / player.currentDuration() * 100;
            });
        });

        audio.addEventListener('canplay', function() {
            $rootScope.$apply(function() {
                player.ready = true;
            });
        });

        return player;
    }])
    .directive('nprLink', function() {
        return {
            restrict: 'EA',
            require: ['^ngModel'],
            replace: true,
            scope: {
                ngModel: '=',
                player: '='
            },
            templateUrl: '/views/nprListItem.html',
            link: function(scope, el, attr) {
                scope.duration = scope.ngModel.audio[0].duration.$text;
            }
        }
    })
;
