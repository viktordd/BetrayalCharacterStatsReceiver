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

            scope.up = function() {
                scope.char.might = scope.char.might === 8 ? 8 : scope.char.might + 1;
                scope.char.speed = scope.char.speed === 8 ? 8 : scope.char.speed + 1;
                scope.char.sanity = scope.char.sanity === 8 ? 8 : scope.char.sanity + 1;
                scope.char.knowledge = scope.char.knowledge === 8 ? 8 : scope.char.knowledge + 1;
            }
            scope.down = function() {
                scope.char.might = scope.char.might === 0 ? 0 : scope.char.might - 1;
                scope.char.speed = scope.char.speed === 0 ? 0 : scope.char.speed - 1;
                scope.char.sanity = scope.char.sanity === 0 ? 0 : scope.char.sanity - 1;
                scope.char.knowledge = scope.char.knowledge === 0 ? 0 : scope.char.knowledge - 1;
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