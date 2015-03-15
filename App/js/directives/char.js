'use strict';

angular.module('betrayalCharacterStatsReceiver').directive('bcsrChar', function() {
    return {
        restrict: 'E',
        scope: {
            char: '='
        },
        templateUrl: 'templates/char.html',
        link: function(scope, element) {
            scope.getClass = function(pos) {
                return 'p-' + pos;
            }
            scope.min = function() {
                scope.char.might = 0;
                scope.char.speed = 0;
                scope.char.sanity = 0;
                scope.char.knowledge = 0;
            }
            scope.max = function() {
                scope.char.might = 8;
                scope.char.speed = 8;
                scope.char.sanity = 8;
                scope.char.knowledge = 8;
            }
        }
    }
});