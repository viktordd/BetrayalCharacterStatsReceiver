import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { CastReceiverManagerService } from './cast-receiver-manager.service';
import { Player } from '../players/player.model';
import { CONFIG } from '../config';

@Injectable()
export class MessageBusService {
    private serviceId = 'MessageBusService';
    manager: any;
    messageBus: any;
    onMessage: Subject<Player> = new Subject();

    constructor(private castReceiverManagerService: CastReceiverManagerService, private zone: NgZone) { }

    public init = () => {
        this.castReceiverManagerService.init();

        if (this.messageBus != null) {
            return false;
        }

        console.log(this.serviceId + '.init');

        this.manager = this.castReceiverManagerService.manager;
        this.messageBus = this.manager.getCastMessageBus(CONFIG.chromecastNamespace.betrayalCharacterStats);

        this.messageBus.onMessage = (event) => {
            console.log(`Received Message: ${JSON.stringify(event)}`);

            this.zone.run(() => {
                const player = new Player(this.castReceiverManagerService.getId(event.senderId));
                Object.assign(player, JSON.parse(event.data));

                this.onMessage.next(player);
            });
        };

        this.manager.start({ statusText: 'Ready to play', maxInactivity: 30 * 60 });

        return true;
    }
}
