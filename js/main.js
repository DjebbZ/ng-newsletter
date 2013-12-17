angular.module('myApp', [])
    .controller('PlayerController', ['$scope', function($scope) {
        $scope.playing = false;
        $scope.audio = document.createElement('audio');
        $scope.audio.src = '/media/npr.mp4';

        $scope.play = function() {
            $scope.audio.play();
            $scope.playing = true;
        };
        $scope.stop = function() {
            $scope.audio.pause();
            $scope.playing = false;
        };
        $scope.audio.addEventListener('ended', function() {
            $scope.$apply(function() {
                $scope.stop();
            });
        });
    }])
    .controller('RelatedController', ['$scope', function($scope) {}])
    .controller('MyController', ['$scope', function($scope) {
        $scope.person = { name: "Ari Lerner" };
        function updateClock () {
            $scope.clock = new Date();
        }
        var timer = setInterval(function() {
            $scope.$apply(updateClock);
        }, 1000);
        updateClock();
    }]);
