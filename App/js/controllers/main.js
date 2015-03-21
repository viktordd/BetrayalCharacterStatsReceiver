﻿'use strict';

angular.module('betrayalCharacterStatsReceiver').controller('mainCtrl', ['$scope',
    function($scope) {

        $scope.chars = {
            data: [
                //{
                //    id: '1',
                //    char: 'blue_madame_zostra',
                //    playerName: 'Test Player',
                //    speed: 3,
                //    might: 4,
                //    sanity: 3,
                //    knowledge: 4
                //},
            ]
        };

        cast.receiver.logger.setLevelValue(0);
        window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
        console.log('Starting Receiver Manager');

        // handler for the 'ready' event
        window.castReceiverManager.onReady = function(event) {
            console.log('Received Ready event: ' + JSON.stringify(event.data));
            window.castReceiverManager.setApplicationState('Application status is ready...');
        };

        // handler for 'senderconnected' event
        window.castReceiverManager.onSenderConnected = function(event) {
            console.log('Received Sender Connected event: ' + event);
            console.log(window.castReceiverManager.getSender(event.data).userAgent);
            
            var player = JSON.parse(event.data);
            

            //$scope.$apply(function() {
            //    $scope.chars.data.push();
            //});
        };

        // handler for 'senderdisconnected' event
        window.castReceiverManager.onSenderDisconnected = function(event) {
            console.log('Received Sender Disconnected event: ' + event.data);
            if (window.castReceiverManager.getSenders().length == 0) {
                window.close();
            }
        };

        // create a CastMessageBus to handle messages for a custom namespace
        window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:com.google.cast.betrayalCharacterStats');

        // handler for the CastMessageBus message event
        window.messageBus.onMessage = function(event) {
            console.log('Message [' + event.senderId + ']: ' + event.data);

            //$scope.$apply(function() {
            //    $scope.chars.data.push(JSON.parse(event.data));
            //});

            // inform all senders on the CastMessageBus of the incoming message event
            // sender message listener will be invoked
            window.messageBus.send(event.senderId, event.data);
        }

        // initialize the CastReceiverManager with an application status message
        var appConfig = new cast.receiver.CastReceiverManager.Config();
        appConfig.statusText = 'Ready to play';
        // 100 minutes for testing, use default 10sec in prod by not setting this value
        appConfig.maxInactivity = 6000;

        window.castReceiverManager.start(appConfig);
        console.log('Receiver Manager started');
    }
]);