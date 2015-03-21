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
            scope.getStat = function(stat) {
                return window.bcsrConst.stats[scope.char.char][stat][scope.char[stat]];
            }
        }
    }
});