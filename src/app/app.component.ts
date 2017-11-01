import { Component, OnInit } from '@angular/core';

import { CastReceiverManagerService } from './services/cast-receiver-manager.service';
import { MessageBusService } from './services/message-bus.service';
import { Player } from './players/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Betrayal Character Stats';

  private players: Player[] = [];

  constructor(
    private messageBusService: MessageBusService,
    private castReceiverManagerService: CastReceiverManagerService) { }

  ngOnInit() {
    this.castReceiverManagerService.onSenderConnected.subscribe(id => this.onSenderConnected(id));
    this.castReceiverManagerService.onSenderDisconnected.subscribe(id => this.onSenderDisconnected(id));
    this.messageBusService.onMessage.subscribe(event => this.onMessage(event));

    this.messageBusService.init();
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
