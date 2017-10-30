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

  get player() {
    if (this.players.length === this.i ) {
      const chars = Object.keys(CONFIG.stats);
      const charName = chars[this.i * 2 + 1];
      const charConfig = CONFIG.stats[charName];
      this.players.push({
        id: '' + this.i,
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

  constructor() { }

  ngOnInit() {
  }
}
