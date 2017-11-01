import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { CastReceiverManagerService } from './cast-receiver-manager.service';
import { CONFIG } from '../config';

@Injectable()
export class MessageBusService {
    private serviceId = 'MessageBusService';
    manager: any;
    messageBus: any;
    onMessage: Subject<any> = new Subject();

    constructor(private castReceiverManagerService: CastReceiverManagerService) { }

    public init = () => {
        this.castReceiverManagerService.init();

        if (this.messageBus != null) {
            return false;
        }

        console.log(this.serviceId + '.init');

        this.manager = this.castReceiverManagerService.manager;
        this.messageBus = this.manager.getCastMessageBus(CONFIG.chromecastNamespace.betrayalCharacterStats);

        this.messageBus.onMessage = (event) => {
            this.onMessage.next(event);
        };

        // TODO: 100 minutes for testing, use default 10sec in prod by not setting maxInactivity
        this.manager.start({ statusText: 'Ready to play', maxInactivity: 6000 });

        return true;
    }
}
