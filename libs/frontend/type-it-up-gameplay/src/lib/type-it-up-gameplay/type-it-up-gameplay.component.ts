import { ButtonComponent } from '@/frontend/shared';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Game, GameOptions, GameResults } from '../../types';
import { DefaultGameOptions } from '../constants';
import { GameMenuComponent } from '../game-menu/game-menu.component';
import { GameOverModalComponent } from '../game-over-modal/game-over-modal.component';
import { GameService } from '../game.service';
import { GameComponent } from '../game/game.component';
import { Word } from '../game/types';
import { GameplayStatus } from './types';

@Component({
  selector: 'lib-type-it-up-gameplay',
  standalone: true,
  imports: [
    CommonModule,
    GameComponent,
    GameMenuComponent,
    ButtonComponent,
    GameOverModalComponent,
  ],
  templateUrl: './type-it-up-gameplay.component.html',
})
export class TypeItUpGameplayComponent implements OnDestroy {
  state: GameplayStatus = GameplayStatus.MENU;
  game: Game | null = null;
  options: GameOptions = DefaultGameOptions;
  gameGenSubscription: Subscription | null = null;
  gameResults: GameResults | null = null;

  gameService: GameService = inject(GameService);
  toastr = inject(ToastrService);

  onGameEnd(words: Word[]) {
    if (!this.game) return;
    const gameResults = this.gameService.handleGameEnd(
      this.game,
      words,
      this.options
    );
    this.gameResults = gameResults;
    this.state = GameplayStatus.FINISHED;
  }

  onSubmit() {
    this.state = GameplayStatus.LOADING;
    this.gameService.getNewGame(this.options).subscribe({
      next: (value) => {
        this.game = value;
        this.state = GameplayStatus.ONGOING;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Something went Wrong!');
        this.state = GameplayStatus.MENU;
      },
    });
  }

  onRestart(){
    this.state = GameplayStatus.MENU
  }
  ngOnDestroy(): void {
    this.gameGenSubscription?.unsubscribe();
  }
}
