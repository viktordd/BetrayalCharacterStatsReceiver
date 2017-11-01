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
    this.castReceiverManagerService.onSenderConnected.subscribe(this.onSenderConnected);
    this.castReceiverManagerService.onSenderDisconnected.subscribe(this.onSenderDisconnected);
    this.messageBusService.onMessage.subscribe(this.onMessage);

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

  private onMessage(event) {
    console.log('messageBus.onMessage: ' + JSON.stringify(event['data']));
    const payload = JSON.parse(event['data']);

    const id = this.castReceiverManagerService.getId(event.senderId);
    const player = this.findPlayerById(id);

    if (player) {
      Object.assign(player, JSON.parse(event.data));
    } else {
      console.log('Player with id [' + event.senderId + '] could not be found!');
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
