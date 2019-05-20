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
      state('in', style({ height: '*' })),
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

  getClass(pos: number) {
    return 'p-' + (pos ? pos : 0);
  }

  isInit(stat: string) {
    const char = CONFIG.stats[this.player.char];
    if (char) {
      return char['init' + this.toFirstUpper(stat)] === this.player[stat];
    }
  }

  getStat(stat: string) {
    const char = CONFIG.stats[this.player.char];
    if (char) {
      return char[stat][this.player[stat]];
    }
    return 0;
  }

  toFirstUpper(val: string) {
    return val[0].toUpperCase() + val.substr(1).toLowerCase();
  }
}
