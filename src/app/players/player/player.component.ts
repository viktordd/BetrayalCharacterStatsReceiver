import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Player } from '../player.model';
import { CONFIG } from '../../config';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css', './player.component.less'],
  animations: [
    trigger('flyInOut', [
      state('in', style({height: '*'})),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'rotate3d(1,1,1,-90deg)',
          'transform-origin': 'right top'
        }),
        animate('400ms ease')
      ]),
      transition(':leave', [
        animate('400ms ease', style({
          opacity: 0,
          transform: 'rotate3d(1,-1,-1,90deg)',
          'transform-origin': 'right bottom'
        }))
      ])
    ])
  ]
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
