'use strict';

angular.module('betrayalCharacterStatsReceiver').controller('mainCtrl', ['$scope',
    function($scope) {

        $scope.chars = {
            ct: 0,
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
                {
                    id: '2',
                    char: 'green_brandon_jaspers',
                    playerName: 'Test Player 2',
                    speed: 3,
                    might: 4,
                    sanity: 4,
                    knowledge: 3
                },
                {
                    id: '3',
                    char: 'purple_heather_granville',
                    playerName: 'Test Player 3',
                    speed: 3,
                    might: 3,
                    sanity: 3,
                    knowledge: 5
                },
                {
                    id: '4',
                    char: 'red_darrin_flash_williams',
                    playerName: 'Test Player 4',
                    speed: 5,
                    might: 3,
                    sanity: 3,
                    knowledge: 3
                },
                {
                    id: '5',
                    char: 'white_father_rhinehardt',
                    playerName: 'Test Player 5',
                    speed: 3,
                    might: 3,
                    sanity: 5,
                    knowledge: 4
                },
                {
                    id: '6',
                    char: 'yellow_missy_dubourde',
                    playerName: 'Test Player 6',
                    speed: 3,
                    might: 4,
                    sanity: 3,
                    knowledge: 4
                }
            ]
        };

        //// utility function to display the text message in the input field
        //function displayText(text) {
        //    console.log(text);
        //    document.getElementById('message').innerHTML = text;
        //    window.castReceiverManager.setApplicationState(text);
        //};

        //window.onload = function() {
        //    cast.receiver.logger.setLevelValue(0);
        //    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
        //    console.log('Starting Receiver Manager');

        //    // handler for the 'ready' event
        //    castReceiverManager.onReady = function(event) {
        //        console.log('Received Ready event: ' + JSON.stringify(event.data));
        //        window.castReceiverManager.setApplicationState('Application status is ready...');
        //    };

        //    // handler for 'senderconnected' event
        //    castReceiverManager.onSenderConnected = function(event) {
        //        console.log('Received Sender Connected event: ' + event.data);
        //        console.log(window.castReceiverManager.getSender(event.data).userAgent);
        //    };

        //    // handler for 'senderdisconnected' event
        //    castReceiverManager.onSenderDisconnected = function(event) {
        //        console.log('Received Sender Disconnected event: ' + event.data);
        //        if (window.castReceiverManager.getSenders().length == 0) {
        //            window.close();
        //        }
        //    };

        //    // handler for 'systemvolumechanged' event
        //    castReceiverManager.onSystemVolumeChanged = function(event) {
        //        console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
        //            event.data['muted']);
        //    };
        //    // create a CastMessageBus to handle messages for a custom namespace
        //    window.messageBus =
        //      window.castReceiverManager.getCastMessageBus(
        //          'urn:x-cast:com.google.cast.sample.helloworld');
        //    // handler for the CastMessageBus message event
        //    window.messageBus.onMessage = function(event) {
        //        console.log('Message [' + event.senderId + ']: ' + event.data);
        //        // display the message from the sender
        //        displayText(event.data);
        //        // inform all senders on the CastMessageBus of the incoming message event
        //        // sender message listener will be invoked
        //        window.messageBus.send(event.senderId, event.data);
        //    }
        //    // initialize the CastReceiverManager with an application status message
        //    window.castReceiverManager.start({ statusText: 'Application is starting' });
        //    console.log('Receiver Manager started');
        //};
    }
]);