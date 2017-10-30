import { Injectable, EventEmitter } from '@angular/core';
import { CastReceiverManagerService } from './cast-receiver-manager.service';
import { CONFIG } from '../config';

@Injectable()
export class MessageBusService {
    private serviceId = 'MessageBusService';
    context: any;
    messageBus: any;
    onMessage: EventEmitter<any> = new EventEmitter();

    constructor(private castReceiverManagerService: CastReceiverManagerService) { }

    public init = () => {
        this.castReceiverManagerService.init();

        if (this.messageBus != null) {
            return false;
        }

        console.log(this.serviceId + '.init');

        this.context = this.castReceiverManagerService.context;

        this.context.addCustomMessageListener(CONFIG.chromecastNamespace, function (customEvent) {
            this.onMessage.next(customEvent);
        });

        return true;
    }
}
