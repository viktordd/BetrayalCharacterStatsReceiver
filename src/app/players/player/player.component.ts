import { Component, Input } from '@angular/core';

import { Player } from '../player.model';
import { CONFIG } from '../../config';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css', './player.component.less']
})
export class PlayerComponent {
  @Input() player: Player;

  constructor() { }

  private getClass(pos: number) {
    return 'p-' + pos;
  }

  isInit(stat: string) {
    const char = CONFIG.stats[this.player.char];
    if (char) {
      return char['init' + stat[0].toUpperCase() + stat.substr(1)] === this.player[stat];
    }
  }

  private getStat(stat: string) {
    const char = CONFIG.stats[this.player.char];
    if (char) {
      return char[stat][this.player[stat]];
    }
    return 0;
  }
}
