import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from "../game/game.component";
import { GameMenuComponent } from "../game-menu/game-menu.component";
import { Game, GameOptions} from '../../types';
import { GameplayStatus } from './types';
import { ButtonComponent } from '@/frontend/shared';
import { DefaultGameOptions } from '../constants';
import { GameService } from '../game.service';
import { Word } from '../game/types';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'lib-type-it-up-gameplay',
  standalone: true,
  imports: [CommonModule, GameComponent, GameMenuComponent, ButtonComponent],
  templateUrl: './type-it-up-gameplay.component.html',
})
export class TypeItUpGameplayComponent implements OnDestroy{
  state: GameplayStatus = GameplayStatus.MENU;
  game : Game | null = null;
  options:GameOptions = DefaultGameOptions;
  gameGenSubscription: Subscription|null = null;
  
  gameService: GameService = inject(GameService)
  toastr = inject(ToastrService)

  onGameEnd(words: Word[]){
    const gameResults = this.gameService.handleGameEnd(this.game, words, this.options)
    this.state = GameplayStatus.FINISHED
  }

  onSubmit(){
    this.state = GameplayStatus.LOADING;
    this.gameService.getNewGame(this.options).subscribe({
      next: (value)=>{
        this.game = value;
        this.state = GameplayStatus.ONGOING;
      },
      error: (err) =>{
        console.error(err)
        this.toastr.error("Something went Wrong!")
        this.state = GameplayStatus.MENU
      }
    })
  }

  ngOnDestroy(): void {
      this.gameGenSubscription?.unsubscribe()
  }
}
