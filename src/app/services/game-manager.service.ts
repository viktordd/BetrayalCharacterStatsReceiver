import { Injectable } from '@angular/core';

import { CastReceiverManagerService } from './cast-receiver-manager.service';
import { MessageBusService } from './message-bus.service';
import { Player } from '../players/player.model';
import { CONFIG } from '../config';


@Injectable()
export class GameManagerService {
    private disconnected: { timeout: any, player: Player }[] = [];
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

        if (player) {
            player.connected = true;
            const pos = this.findDisconnectedPosById(id);
            if (pos >= 0) {
                clearTimeout(this.disconnected[pos].timeout);
                this.disconnected.splice(pos, 1);
            }
        } else {
            this.players.push(new Player(id));
        }
    }

    private onSenderDisconnected(id: string) {
        const player = this.findPlayerById(id);
        if (!player) { return; }

        player.connected = false;

        const disconnect = {
            player: player,
            timeout: setTimeout(() => this.disconnectPlayer(disconnect), CONFIG.disconnectTimeout)
        };

        this.disconnected.push(disconnect);
    }

    private disconnectPlayer(disconnect: { timeout: any, player: Player }) {
        let pos = this.players.indexOf(disconnect.player);
        if (pos >= 0) {
            this.players.splice(pos, 1);
        }
        pos = this.disconnected.indexOf(disconnect);
        if (pos >= 0) {
            this.disconnected.splice(pos, 1);
        }
        if (this.players.length === 0) {
            window.close();
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

    private findDisconnectedPosById(id: string) {
        for (let i = 0; i < this.disconnected.length; i++) {
            const p = this.disconnected[i].player;
            if (p.id === id) {
                return i;
            }
        }
        return -1;
    }
}
