import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

declare var cast: any;

@Injectable()
export class CastReceiverManagerService {
    private serviceId = 'CastReceiverManagerService';
    manager: any;

    onSenderConnected: Subject<string> = new Subject();
    onSenderDisconnected: Subject<string> = new Subject();

    constructor(private zone: NgZone) { }

    public init = () => {
        console.log(this.serviceId + '.init');

        if (this.manager != null) {
            return false;
        }

        this.manager = cast.receiver.CastReceiverManager.getInstance();

        this.manager.onReady = (event) => {
            console.log(`Received Ready event: ${JSON.stringify(event)}`);
        };

        this.manager.onSenderConnected = (event) => {
            console.log(`Received Sender Connected event: ${JSON.stringify(event)}`);
            console.log(this.manager.getSender(event.senderId));
            this.zone.run(() => {
                this.onSenderConnected.next(this.getId(event.senderId));
            });
        };

        this.manager.onSenderDisconnected = (event) => {
            console.log(`Received Sender Disconnected event: ${JSON.stringify(event)}`);
            if (this.manager.getSenders().length === 0 && event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
                return;
            }
            this.zone.run(() => {
                this.onSenderDisconnected.next(this.getId(event.senderId));
            });
        };

        this.manager.onSystemVolumeChanged = (event) => {
            console.log(`Received System Volume Changed event: ${JSON.stringify(event)}`);
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
