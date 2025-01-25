import { Injectable } from '@angular/core';
import { CharState, Word } from './game/types';
import { Game, GameOptions, GameResults } from '../types';
import { difficultyMultiplier, optionMultiplier } from './constants';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  calculateMetrics(words: Word[], time: number){
      let totalRightChars = 0;
      let totalWrittenChars = 0;
      let finished = false;
      let nb_words = 0;


      for (const word of words) {
        if(finished) break;
        nb_words++;
        for (const char of word) {
            if (char.state === CharState.Deactivated) {finished = true; break;} 
            if (char.state === CharState.Right) totalRightChars++;
            totalWrittenChars++;
        }
      }

      nb_words--;
      const wpm = (nb_words / (time/60)) 
      const accuracy = totalWrittenChars === 0 ? 0 : totalRightChars / totalWrittenChars;
      return {wpm, accuracy}
  }

  calculateGameResults(words: Word[], gameOptions: GameOptions) : GameResults{
    const {wpm, accuracy} = this.calculateMetrics(words, gameOptions.time)
    const multiplier = difficultyMultiplier[gameOptions.difficulty] * (1 + (gameOptions.numbers ? optionMultiplier : 0) + (gameOptions.punctuation ? optionMultiplier : 0))
    const score = wpm * accuracy * multiplier

    return {wpm, accuracy, score}
  }

  handleGameEnd(game: Game | null, words: Word[], gameOptions: GameOptions): GameResults{
    // TODO: persist game
    const gameResults = this.calculateGameResults(words, gameOptions);
    return gameResults
  }  

  getNewGame(): Game{
    // TODO: use the gameGenerator
    return {text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
  }

}
