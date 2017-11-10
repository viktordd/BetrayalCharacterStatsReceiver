import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CastReceiverManagerService } from './services/cast-receiver-manager.service';
import { GameManagerService } from './services/game-manager.service';
import { MessageBusService } from './services/message-bus.service';

import { PlayerListComponent } from './players/player-list.component';
import { PlayerComponent } from './players/player/player.component';
import { PlayerTestComponent } from './players/player-test/player-test.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    PlayerComponent,
    PlayerTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    CastReceiverManagerService,
    GameManagerService,
    MessageBusService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
