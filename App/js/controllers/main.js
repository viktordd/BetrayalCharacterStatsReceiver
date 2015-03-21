'use strict';

angular.module('betrayalCharacterStatsReceiver').controller('mainCtrl', ['$scope',
    function($scope) {

        $scope.chars = {
            data: [
                {
                    id: '1',
                    char: 'blue_madame_zostra',
                    playerName: 'Test Player',
                    speed: 3,
                    might: 4,
                    sanity: 3,
                    knowledge: 4
                },
            ]
        };

        cast.receiver.logger.setLevelValue(0);
        var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
        console.log('Starting Receiver Manager');

        // handler for the 'ready' event
        castReceiverManager.onReady = function(event) {
            console.log('Received Ready event: ' + JSON.stringify(event.data));
            castReceiverManager.setApplicationState('Application status is ready...');
        };

        // handler for 'senderconnected' event
        castReceiverManager.onSenderConnected = function(event) {
            console.log('Received Sender Connected event: ' + event.data);
            console.log(castReceiverManager.getSender(event.data).userAgent);
        };

        // handler for 'senderdisconnected' event
        castReceiverManager.onSenderDisconnected = function(event) {
            console.log('Received Sender Disconnected event: ' + event.data);
            if (castReceiverManager.getSenders().length == 0) {
                window.close();
            }
        };

        //// handler for 'systemvolumechanged' event
        //castReceiverManager.onSystemVolumeChanged = function(event) {
        //    console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
        //        event.data['muted']);
        //};

        // create a CastMessageBus to handle messages for a custom namespace
        window.messageBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.google.cast.betrayalCharacterStats');

        // handler for the CastMessageBus message event
        window.messageBus.onMessage = function(event) {
            console.log('Message [' + event.senderId + ']: ' + event.data);

            // inform all senders on the CastMessageBus of the incoming message event
            // sender message listener will be invoked
            window.messageBus.send(event.senderId, event.data);
        }
        // initialize the CastReceiverManager with an application status message
        castReceiverManager.start({ statusText: 'Application is starting' });
        console.log('Receiver Manager started');
    }
]);