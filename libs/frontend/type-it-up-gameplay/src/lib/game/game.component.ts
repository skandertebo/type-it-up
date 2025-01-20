import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CharState,  Word, Cursor } from './types';
import { interval, map, Subscription, takeWhile } from 'rxjs';

@Component({
  selector: 'lib-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule],

})
export class GameComponent implements OnInit{
  @Input() text =  "";
  @Input() time = 30;

  words: Word[] = [];
  cursor: Cursor = { wordIndex: 0, charIndex: 0 };
  timeLeft = 0;
  timeSub : Subscription| null = null;
  isactive = false;
  isfinished = false;

  ngOnInit(): void {
    this.initializeWords();
  }
  
  startGame(){
    this.isactive = true;
    this.timeLeft = this.time;
    this.timeSub = interval(1000).pipe(map((val)=>(this.time - val - 1)),takeWhile((val) => val>=0)).subscribe(
      {
        next: (val)=>{
          this.timeLeft = val
        },
        complete: ()=>{
          this.endGame()
        }
      }
    )

  }


  endGame(){
    this.isfinished = true
    if(this.timeLeft){
      this.timeSub?.unsubscribe()  
    }
  }

  initializeWords() {
    this.words = this.text.split(' ').map((word) =>
      word.split('').map((char) => ({
        char,
        state: CharState.Deactivated,
      }))
    );
  }




  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if(!this.isactive) this.startGame()
    if(!this.isfinished){
      const key = event.key;

      if (/^[a-zA-Z0-9,.!?]$/.test(key)) {
        this.handleAlphanumeric(key);
      } else if (key === ' ') {
        this.handleSpacebar();
      } else if (key === 'Backspace') {
        this.handleBackspace();
      }
    }
  }

  handleAlphanumeric(key: string) {
    const { wordIndex, charIndex } = this.cursor;
    if (wordIndex < this.words.length && charIndex < this.words[wordIndex].length) {
      const currentChar = this.words[wordIndex][charIndex];
      currentChar.state = currentChar.char === key ? CharState.Right : CharState.Wrong;
      this.cursor.charIndex++;
    }
  }

  handleSpacebar() {
    let index  = this.cursor.charIndex;
    const wordIndex = this.cursor.wordIndex

    // Mark remaining characters in the word as 'wrong'
    while (index < this.words[wordIndex].length) {
      this.words[wordIndex][index].state = CharState.Wrong;
      index++;
    }

    // Move to the next word
    if (wordIndex < this.words.length - 1) {
      this.cursor.wordIndex++;
      this.cursor.charIndex = 0;
    } else if(wordIndex == this.words.length - 1){
      this.cursor.charIndex = this.words[wordIndex].length 
    }
  }

  handleBackspace() {
    const { wordIndex, charIndex } = this.cursor;

    if (charIndex > 0) {
      // Deactivate the last character in the current word
      this.cursor.charIndex--;
      this.words[wordIndex][this.cursor.charIndex].state = CharState.Deactivated;
    } else if (wordIndex > 0) {
      // Move back to the last word
      this.cursor.wordIndex--;
      this.cursor.charIndex = this.words[wordIndex - 1].length;
    }
     
  } 
}