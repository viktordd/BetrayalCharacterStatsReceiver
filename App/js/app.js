'use strict';

angular.module('betrayalCharacterStatsReceiver', ['ngRoute', 'ngAnimate'])
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