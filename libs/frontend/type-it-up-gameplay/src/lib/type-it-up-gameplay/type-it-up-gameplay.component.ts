import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from "../game/game.component";
import { GameMenuComponent } from "../game-menu/game-menu.component";
import { Game, GameOptions} from '../../types';
import { GameplayStatus } from './types';
import { ButtonComponent } from '@/frontend/shared';
import { DefaultGameOptions } from '../constants';
import { GameService } from '../game.service';
import { Word } from '../game/types';




@Component({
  selector: 'lib-type-it-up-gameplay',
  standalone: true,
  imports: [CommonModule, GameComponent, GameMenuComponent, ButtonComponent],
  templateUrl: './type-it-up-gameplay.component.html',
})
export class TypeItUpGameplayComponent {
  state: GameplayStatus = GameplayStatus.MENU;
  game : Game | null = null;
  options:GameOptions = DefaultGameOptions;
  
  gameService: GameService = inject(GameService)

  onGameEnd(words: Word[]){
    const gameResults = this.gameService.handleGameEnd(this.game, words, this.options)
    this.state = GameplayStatus.FINISHED
  }

  onSubmit(){
    //TODO: put loading state
    this.game = this.gameService.getNewGame()
    this.state = GameplayStatus.ONGOING;
  }

}
