import { Component, Input } from '@angular/core';
import { trigger, transition, animateChild, query } from '@angular/animations';

import { Player } from './player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  animations: [
    trigger('childAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})
export class PlayerListComponent {
  @Input() players: Player[] = [];

  trackByPlayers(index: number, item: Player) {
    return item.id;
  }
}
