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
                var char = window.bcsrConst.stats[scope.char.char];
                if (char)
                    return char[stat][scope.char[stat]];
                else
                    return 0;
            }
        }
    }
});