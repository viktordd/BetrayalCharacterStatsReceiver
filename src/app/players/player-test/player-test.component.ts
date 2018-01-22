import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../player.model';
import { CONFIG } from '../../config';

@Component({
  selector: 'app-player-test',
  templateUrl: './player-test.component.html',
  styleUrls: ['./player-test.component.css']
})
export class PlayerTestComponent implements OnInit {
  @Input() players: Player[];
  i = 0;
  chars: string[];

  constructor() { }

  ngOnInit() {
    this.chars = Object.keys(CONFIG.stats);
  }

  get player() {
    if (this.players.length === this.i) {
      const charName = this.chars[this.i * 2];
      const charConfig = CONFIG.stats[charName];
      this.players.push({
        id: '' + this.i,
        connected: true,
        char: charName,
        name: 'test',
        speed: charConfig.initSpeed,
        might: charConfig.initMight,
        sanity: charConfig.initSanity,
        knowledge: charConfig.initKnowledge
      });
    }
    return this.players[this.i];
  }

  removePlayer() {
    this.players.splice(this.i, 1);
    if (this.i > 0 && this.i === this.players.length) {
      this.i--;
    }
  }
}
