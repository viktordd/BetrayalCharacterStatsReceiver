import { Component, OnInit } from '@angular/core';

import { GameManagerService } from './services/game-manager.service';
import { Player } from './players/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Betrayal Character Stats';
  testing = false;

  private players: Player[] = [];

  constructor(
    private gameManagerService: GameManagerService) { }

  ngOnInit() {
    this.gameManagerService.init();
    this.players = this.gameManagerService.Players;
  }

  toggleTesting() {
    this.testing = !this.testing;
  }
}
