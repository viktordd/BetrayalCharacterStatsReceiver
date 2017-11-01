import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

declare var cast: any;

@Injectable()
export class CastReceiverManagerService {
    private serviceId = 'CastReceiverManagerService';
    manager: any;

    onSenderConnected: Subject<string> = new Subject();
    onSenderDisconnected: Subject<string> = new Subject();

    public init = () => {
        console.log(this.serviceId + '.init');

        if (this.manager != null) {
            return false;
        }

        this.manager = cast.receiver.CastReceiverManager.getInstance();

        this.manager.onReady = (event) => {
            console.log(`Received Ready event: ${event}`);
            this.manager.setApplicationState('Application status is ready...');
        };

        this.manager.onSenderConnected = (event) => {
            console.log(`Received Sender Connected event: ${event}`);
            console.log(this.manager.getSender(event.senderId));
            this.onSenderConnected.next(this.getId(event.senderId));
        };

        this.manager.onSenderDisconnected = (event) => {
            console.log(`Received Sender Disconnected event: ${event}`);
            if (this.manager.getSenders().length === 0 && event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
                return;
            }
            this.onSenderDisconnected.next(this.getId(event.senderId));
        };

        this.manager.onSystemVolumeChanged = (event) => {
            console.log(`Received System Volume Changed event: ${event}`);
        };

        return true;
    }

    public getId(senderId): string {
        const indx = senderId.indexOf(':');
        if (indx >= 0) {
            return senderId.substr(0, indx);
        }
    }
}
