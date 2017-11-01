import { Injectable, EventEmitter } from '@angular/core';
import { CastReceiverManagerService } from './cast-receiver-manager.service';
import { CONFIG } from '../config';

@Injectable()
export class MessageBusService {
    private serviceId = 'MessageBusService';
    manager: any;
    messageBus: any;
    onMessage: EventEmitter<any> = new EventEmitter();

    constructor(private castReceiverManagerService: CastReceiverManagerService) { }

    public init = () => {
        this.castReceiverManagerService.init();

        if (this.messageBus != null) {
            return false;
        }

        console.log(this.serviceId + '.init');

        this.manager = this.castReceiverManagerService.manager;

        const service = this;
        this.manager.addCustomMessageListener(CONFIG.chromecastNamespace.betrayalCharacterStats, function (event) {
            service.onMessage.next(event);
        });

        return true;
    }
}
