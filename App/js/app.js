'use strict';

angular.module('betrayalCharacterStatsReceiver', ['ngRoute', 'bcsrControllers'])
    .config([
        '$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'mainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ]);