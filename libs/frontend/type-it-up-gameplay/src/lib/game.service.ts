import { inject, Injectable } from '@angular/core';
import { CharState, Word } from './game/types';
import { Game, GameOptions, GameResults } from '../types';
import { difficultyMultiplier, optionMultiplier } from './constants';
import { Apollo } from 'apollo-angular';
import { AuthService } from '@/frontend/type-it-up-auth';
import { CREATE_GAME } from '@/frontend/type-it-up-graphql';

@Injectable(
  {
    providedIn:'root'
  }
)
export class GameService{
  apolloClient = inject(Apollo)
  authenticationService = inject(AuthService)


  saveGame(game: Game, userContent:string, gameOptions: GameOptions, gameResults: GameResults){
    return this.apolloClient.mutate({
      mutation: CREATE_GAME,
      variables:{
        createGameInput:{
          options:{
            punctuation: gameOptions.punctuation,
            numbers: gameOptions.numbers,
            difficulty: gameOptions.difficulty
          },
          gameContent: game?.text,
          userContent,
          duration: gameOptions.time,
          ...gameResults
        }
      }
   })
  }


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
    const gameResults = this.calculateGameResults(words, gameOptions);
    if(this.authenticationService.isAuthenticated()) this.saveGame(game!, this.getUserContent(words), gameOptions, gameResults).subscribe();
    return gameResults
  }  

  getNewGame(): Game{
    // TODO: use the gameGenerator
    return {text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
  }

  getUserContent(words:Word[]){
    return words
    .map(word => 
      word
        .filter(char => char.state !== CharState.Deactivated)
        .map(char => char.char)
        .join('')
    )
    .join(' ');
  }

}
