import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from "../game/game.component";
import { GameMenuComponent } from "../game-menu/game-menu.component";
import { Game, GameOptions} from '../../types';
import { GameplayStatus } from './types';
import { ButtonComponent } from '@/frontend/shared';
import { DefaultGameOptions } from '../constants';




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


  onSubmit(){
    console.log(this.options)
    //Generate a game
    this.game = {text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
    this.state = GameplayStatus.ONGOING;
  }

}
