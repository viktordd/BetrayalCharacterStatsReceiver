import { Injectable } from '@angular/core';

import { CastReceiverManagerService } from './cast-receiver-manager.service';
import { MessageBusService } from './message-bus.service';
import { Player } from '../players/player.model';


@Injectable()
export class GameManagerService {
    private players: Player[] = [];

    public get Players(): Player[] {
        return this.players;
    }

    constructor(
        private messageBusService: MessageBusService,
        private castReceiverManagerService: CastReceiverManagerService) { }

    public init() {
        this.castReceiverManagerService.onSenderConnected.subscribe(id => this.onSenderConnected(id));
        this.castReceiverManagerService.onSenderDisconnected.subscribe(id => this.onSenderDisconnected(id));
        this.messageBusService.onMessage.subscribe(event => this.onMessage(event));

        this.messageBusService.init('Betrayal Character Stats');
    }

    private onSenderConnected(id: string) {
        const player = this.findPlayerById(id);
        if (!player) {
            this.players.push(new Player(id));
        }
    }

    private onSenderDisconnected(id: string) {
        const pos = this.findPlayerPosById(id);
        if (pos >= 0) {
            this.players.splice(pos, 1);
        }
    }

    private onMessage(player: Player) {
        const pos = this.findPlayerPosById(player.id);

        if (pos >= 0) {
            Object.assign(this.players[pos], player);
        } else {
            this.players.push(player);
        }
    }

    private findPlayerById(id: string) {
        for (let i = 0; i < this.players.length; i++) {
            const p = this.players[i];
            if (p.id === id) {
                return p;
            }
        }
        return null;
    }

    private findPlayerPosById(id: string) {
        for (let i = 0; i < this.players.length; i++) {
            const p = this.players[i];
            if (p.id === id) {
                return i;
            }
        }
        return -1;
    }

    private trackByPlayers(index: number, player: Player) {
        return player.id;
    }
}
