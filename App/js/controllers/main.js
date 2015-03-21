'use strict';

angular.module('betrayalCharacterStatsReceiver').controller('mainCtrl', ['$scope',
    function($scope) {

        $scope.chars = {
            data: [
                //{
                //    id: '1',
                //    char: '',
                //    playerName: '',
                //    speed: 0,
                //    might: 0,
                //    sanity: 0,
                //    knowledge: 0
                //},
            ]
        };

        function getId(senderId) {
            var indx = senderId.indexOf(':');
            if (indx >= 0) {
                return senderId.substr(0, indx);
            }
        }

        function find(id) {
            for (var i = 0; i < $scope.chars.data.length; i++) {
                var p = $scope.chars.data[i];
                if (p.id === id) {
                    return p;
                }
            }
            return null;
        }

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
            console.log('Received Sender Connected event: ' + JSON.stringify(event.senderId));
            console.log(window.castReceiverManager.getSender(event.data).userAgent);

            $scope.$apply(function() {
                var id = getId(event.senderId);
                var player = find(id);
                if (!player)
                    $scope.chars.data.push({
                        id: id
                    });
            });
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

            $scope.$apply(function() {
                var id = getId(event.senderId);
                var player = find(id);

                if (player) {
                    angular.extend(player, JSON.parse(event.data));
                } else {
                    console.log('Player with id [' + event.senderId + '] could not be found!');
                }

            });

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