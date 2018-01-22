import { Component, OnInit } from '@angular/core';

import { GameManagerService } from './services/game-manager.service';
import { Player } from './players/player.model';
import { CONFIG } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Betrayal Character Stats';
  testing = false;

  players: Player[] = [];
  preloadPlayers: Player[] = [];

  constructor(
    private gameManagerService: GameManagerService) { }

  ngOnInit() {
    this.preLoadImages();
    this.gameManagerService.init();
    this.players = this.gameManagerService.Players;
  }

  toggleTesting() {
    this.testing = !this.testing;
  }

  preLoadImages() {
    for (const key in CONFIG.stats) {
      if (CONFIG.stats.hasOwnProperty(key)) {
        const player = new Player(key);
        player.char = key;
        this.preloadPlayers.push(player);
      }
    }
  }
}
