import { Injectable, EventEmitter } from '@angular/core';

declare var cast: any;

@Injectable()
export class CastReceiverManagerService {
    private serviceId = 'CastReceiverManagerService';
    context: any;

    onSenderConnected: EventEmitter<number> = new EventEmitter();
    onSenderDisconnected: EventEmitter<number> = new EventEmitter();

    public init = () => {
        console.log(this.serviceId + '.init');

        if (this.context != null) {
            return false;
        }

        this.context = cast.framework.CastReceiverContext.getInstance();

        this.context.onReady = (event) => {
            console.log('Received Ready event: ' + JSON.stringify(event.data));
            this.context.setApplicationState('Application status is ready...');
        };

        this.context.onSenderConnected = (event) => {
            console.log('Received Sender Connected event: ' + event.data);
            console.log(this.context.getSender(event.data).userAgent);
            this.onSenderConnected.next(this.getId(event.senderId));
        };

        this.context.onSenderDisconnected = (event) => {
            if (this.context.getSenders().length === 0 && event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
                return;
            }
            this.onSenderDisconnected.next(this.getId(event.senderId));
        };

        this.context.onSystemVolumeChanged = (event) => {
            console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' + event.data['muted']);
        };

        return true;
    }

    public getId(senderId) {
        const indx = senderId.indexOf(':');
        if (indx >= 0) {
            return senderId.substr(0, indx);
        }
    }
}
